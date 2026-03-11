#!/usr/bin/env python3
import argparse
import csv
from pathlib import Path


DEFAULT_EXTENSIONS = {".mp4", ".mov", ".m4v", ".avi", ".mkv", ".webm", ".json", ".csv"}


def slugify(value: str) -> str:
    cleaned = []
    for char in value.lower():
        if char.isalnum():
            cleaned.append(char)
        elif char in {"-", "_", " "}:
            cleaned.append("-")
    slug = "".join(cleaned).strip("-")
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug or "clip"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create a dataset manifest from labeled folders.")
    parser.add_argument("raw_root", type=Path, help="Root folder containing one subfolder per label.")
    parser.add_argument("output_csv", type=Path, help="Path to write the manifest CSV.")
    parser.add_argument(
        "--extensions",
        default=",".join(sorted(DEFAULT_EXTENSIONS)),
        help="Comma-separated list of file extensions to include.",
    )
    parser.add_argument(
        "--relative-to",
        type=Path,
        default=None,
        help="Write source paths relative to this directory instead of absolute paths.",
    )
    return parser.parse_args()


def collect_rows(raw_root: Path, allowed_extensions: set[str], relative_to: Path | None) -> list[dict[str, str]]:
    rows = []
    seen_ids: dict[str, int] = {}

    for label_dir in sorted(raw_root.iterdir()):
        if not label_dir.is_dir():
            continue

        label = slugify(label_dir.name)
        for file_path in sorted(label_dir.rglob("*")):
            if not file_path.is_file() or file_path.suffix.lower() not in allowed_extensions:
                continue

            stem = slugify(file_path.stem)
            clip_id = f"{label}-{stem}"
            seen_ids[clip_id] = seen_ids.get(clip_id, 0) + 1
            if seen_ids[clip_id] > 1:
                clip_id = f"{clip_id}-{seen_ids[clip_id]}"

            source_path = file_path
            if relative_to is not None:
                source_path = file_path.relative_to(relative_to)

            suffix = file_path.suffix.lower()
            source_type = "pose-json" if suffix == ".json" else "pose-csv" if suffix == ".csv" else "video"
            rows.append(
                {
                    "clip_id": clip_id,
                    "label": label,
                    "source_path": str(source_path),
                    "source_type": source_type,
                    "split": "",
                    "start_sec": "",
                    "end_sec": "",
                    "pose_path": "",
                    "notes": "",
                }
            )

    return rows


def write_csv(output_csv: Path, rows: list[dict[str, str]]) -> None:
    output_csv.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = ["clip_id", "label", "source_path", "source_type", "split", "start_sec", "end_sec", "pose_path", "notes"]
    with output_csv.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    args = parse_args()
    raw_root = args.raw_root.resolve()
    if not raw_root.exists() or not raw_root.is_dir():
        raise SystemExit(f"Raw root does not exist or is not a directory: {raw_root}")

    relative_to = args.relative_to.resolve() if args.relative_to else None
    allowed_extensions = {extension.strip().lower() for extension in args.extensions.split(",") if extension.strip()}

    rows = collect_rows(raw_root, allowed_extensions, relative_to)
    write_csv(args.output_csv, rows)

    labels = sorted({row["label"] for row in rows})
    print(f"Wrote {len(rows)} rows to {args.output_csv}")
    print(f"Labels: {', '.join(labels) if labels else '(none)'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

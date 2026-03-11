#!/usr/bin/env python3
import argparse
import csv
import random
from collections import defaultdict
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Assign deterministic train/val/test splits by label.")
    parser.add_argument("input_csv", type=Path, help="Source manifest CSV.")
    parser.add_argument("output_csv", type=Path, help="Destination CSV with split assignments.")
    parser.add_argument("--train", type=float, default=0.7, help="Train ratio.")
    parser.add_argument("--val", type=float, default=0.15, help="Validation ratio.")
    parser.add_argument("--test", type=float, default=0.15, help="Test ratio.")
    parser.add_argument("--seed", type=int, default=42, help="Random seed for deterministic shuffling.")
    return parser.parse_args()


def normalize_ratios(train: float, val: float, test: float) -> tuple[float, float, float]:
    total = train + val + test
    if total <= 0:
        raise SystemExit("Split ratios must sum to a positive number.")
    return train / total, val / total, test / total


def allocate_counts(size: int, train_ratio: float, val_ratio: float) -> tuple[int, int, int]:
    if size <= 0:
        return 0, 0, 0
    if size == 1:
        return 1, 0, 0
    if size == 2:
        return 1, 0, 1
    if size == 3:
        return 1, 1, 1

    train_count = max(1, int(round(size * train_ratio)))
    val_count = int(round(size * val_ratio))
    test_count = size - train_count - val_count

    if val_count == 0:
        val_count = 1
        train_count = max(1, train_count - 1)
    if test_count == 0:
        test_count = 1
        train_count = max(1, train_count - 1)

    while train_count + val_count + test_count < size:
        train_count += 1
    while train_count + val_count + test_count > size:
        if train_count > val_count and train_count > test_count and train_count > 1:
            train_count -= 1
        elif val_count > 1:
            val_count -= 1
        elif test_count > 1:
            test_count -= 1
        else:
            break

    return train_count, val_count, test_count


def main() -> int:
    args = parse_args()
    train_ratio, val_ratio, _test_ratio = normalize_ratios(args.train, args.val, args.test)

    with args.input_csv.open("r", newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        rows = list(reader)
        fieldnames = reader.fieldnames or []

    if "label" not in fieldnames:
        raise SystemExit("Manifest must include a 'label' column.")
    if "split" not in fieldnames:
        fieldnames.append("split")

    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in rows:
        grouped[row["label"]].append(row)

    rng = random.Random(args.seed)
    for label, items in grouped.items():
        rng.shuffle(items)
        train_count, val_count, test_count = allocate_counts(len(items), train_ratio, val_ratio)
        for index, row in enumerate(items):
            if index < train_count:
                row["split"] = "train"
            elif index < train_count + val_count:
                row["split"] = "val"
            else:
                row["split"] = "test"
        print(f"{label}: train={train_count}, val={val_count}, test={test_count}")

    args.output_csv.parent.mkdir(parents=True, exist_ok=True)
    with args.output_csv.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Wrote split manifest to {args.output_csv}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

# Data Schema

## Recommended folder layout

```text
project/
  data/
    raw/
      waltz/
        clip-001.mp4
        clip-002.mp4
      hiphop/
        clip-001.mp4
      kpop/
        clip-001.mov
    manifest.csv
    manifest-split.csv
```

Use one directory per label. Keep labels lowercase and stable.

## Manifest columns

`clip_id`
- Stable identifier for one training example.
- Prefer a readable slug derived from label and filename.

`label`
- Class name used during training.
- Keep it short and consistent.

`source_path`
- Absolute or project-relative path to the raw clip.

`source_type`
- Usually `video`.
- Use `pose-json` or `pose-csv` when the source is already extracted motion data.

`split`
- Blank before split assignment.
- Later set to `train`, `val`, or `test`.

`start_sec`
- Optional clip start time.
- Leave blank when the whole file is the example.

`end_sec`
- Optional clip end time.
- Leave blank when the whole file is the example.

`pose_path`
- Optional path to extracted pose landmarks for this example.
- Fill after pose extraction exists.

`notes`
- Free-form annotation for bad framing, low confidence, duplicate choreography, etc.

## Labeling guidance

- Start with 3-8 labels, not dozens.
- Separate `style` labels from `specific choreography` labels. Mixing both in one classifier usually hurts quality.
- Avoid nearly identical labels like `kpop`, `k-pop`, `k_pop`.
- When a clip is ambiguous, duplicate the file only if the user explicitly wants multi-label handling. Otherwise choose one primary label and note the ambiguity in `notes`.

## Suggested next steps after dataset prep

1. Extract pose landmarks per clip.
2. Normalize frame count or build fixed-length windows.
3. Train the classifier.
4. Export label mapping for inference.

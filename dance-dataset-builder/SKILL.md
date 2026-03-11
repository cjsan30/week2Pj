---
name: dance-dataset-builder
description: Build or update labeled dance-motion datasets from local video clips, foldered class examples, or pose JSON/CSV files. Use when Codex needs to prepare training data for dance classification, create dataset manifests, validate label structure, or generate train/validation/test splits for motion ML projects.
---

# Dance Dataset Builder

## Overview

Turn raw dance examples into a repeatable ML dataset package. Use the bundled scripts to scan locally stored clips, create a manifest, and assign deterministic train/validation/test splits before training a classifier.

The skill assumes the source media already exists on disk. If the user starts from YouTube links, download or clip them first, then use this skill to organize the local files.

## Quick Start

1. Arrange raw clips by label using the folder schema in [references/data-schema.md](references/data-schema.md).
2. Run `scripts/init_manifest.py` to build `manifest.csv`.
3. Manually review the labels, trim fields, and notes in the manifest.
4. Run `scripts/split_manifest.py` to assign deterministic `train` / `val` / `test` splits.
5. Train the classifier from the split manifest or ask Codex to write the next-stage pose extraction and model training code.

## Use This Workflow

### 1. Normalize the class layout

- Prefer one directory per label.
- Keep labels stable and lowercase with hyphens or underscores.
- Put only one clip per file. Split long choreography videos into shorter examples before manifest creation.
- Read [references/data-schema.md](references/data-schema.md) before inventing new columns or folder names.

### 2. Create the manifest

Use:

```bash
python3 scripts/init_manifest.py data/raw data/manifest.csv
```

The script scans subfolders beneath the raw root and writes rows with:

- `clip_id`
- `label`
- `source_path`
- `source_type`
- `split`
- `start_sec`
- `end_sec`
- `pose_path`
- `notes`

Use `--extensions` when the dataset includes non-default media extensions.

### 3. Review the manifest

- Fix bad labels before splitting.
- Add clip ranges in `start_sec` / `end_sec` if a later extraction job should use only part of a file.
- Fill `pose_path` only after pose extraction exists.
- Keep `split` blank before running the split script unless the user explicitly wants manual splits.

### 4. Assign train/validation/test splits

Use:

```bash
python3 scripts/split_manifest.py data/manifest.csv data/manifest-split.csv
```

Adjust ratios with `--train`, `--val`, `--test` and use `--seed` for repeatable splits.

### 5. Hand the split manifest to the next task

Typical follow-ups after this skill:

- write a pose extraction batch job
- train a sequence classifier
- export labels for TensorFlow.js or PyTorch
- build an evaluation notebook or confusion matrix report

## Decision Rules

- Use this skill when the user asks to organize dance examples, label clips, create manifests, or prepare ML splits.
- Do not use this skill for real-time inference or music generation tasks unless the request specifically involves dataset preparation.
- Do not invent labels unless the user asks for taxonomy help. If labels are missing, propose a small controlled vocabulary and explain the tradeoff.
- Keep every transformation deterministic. Preserve original file paths in the manifest instead of copying files unless the user asks for export folders.

## Resources

### scripts/

- `scripts/init_manifest.py`: Scan a folder tree of labeled clips and create a manifest CSV.
- `scripts/split_manifest.py`: Assign deterministic train/validation/test splits by label.

### references/

- [references/data-schema.md](references/data-schema.md): Folder layout, manifest schema, and labeling guidance.

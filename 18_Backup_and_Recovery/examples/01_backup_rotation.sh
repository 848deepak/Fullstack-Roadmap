#!/usr/bin/env bash
set -euo pipefail

# Beginner: keep latest 7 backups.
# Advanced: rotation controls storage cost and retention policy.
BACKUP_DIR=${BACKUP_DIR:-./backups}
mkdir -p "$BACKUP_DIR"
ls -1t "$BACKUP_DIR" | tail -n +8 | xargs -I {} rm -f "$BACKUP_DIR/{}" || true

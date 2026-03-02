#!/usr/bin/env bash
# Beginner: Creates compressed PostgreSQL backup.
# Advanced: Pair with retention policy and restore drills for reliability.

set -euo pipefail

DB_NAME="${DB_NAME:-appdb}"
BACKUP_DIR="${BACKUP_DIR:-./backups}"
mkdir -p "$BACKUP_DIR"

OUT_FILE="$BACKUP_DIR/${DB_NAME}_$(date +%F_%H%M%S).sql.gz"
pg_dump "$DB_NAME" | gzip > "$OUT_FILE"

echo "Backup created: $OUT_FILE"

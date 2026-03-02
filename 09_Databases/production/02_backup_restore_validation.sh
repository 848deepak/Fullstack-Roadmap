#!/usr/bin/env bash
# Beginner: create backup and immediately verify restore in temp DB.
# Advanced: restore drills are critical for disaster recovery confidence.

set -euo pipefail

SOURCE_DB=${SOURCE_DB:-appdb}
VERIFY_DB=${VERIFY_DB:-appdb_restore_check}
BACKUP_FILE=${BACKUP_FILE:-./backups/appdb_$(date +%F_%H%M%S).sql}

mkdir -p ./backups

pg_dump "$SOURCE_DB" > "$BACKUP_FILE"

dropdb --if-exists "$VERIFY_DB"
createdb "$VERIFY_DB"
psql "$VERIFY_DB" < "$BACKUP_FILE"

echo "Backup + restore validation successful: $BACKUP_FILE"

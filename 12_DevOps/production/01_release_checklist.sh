#!/usr/bin/env bash
# Production release gate checklist.

set -euo pipefail

echo "[1] Verify tests passed"
echo "[2] Verify migration plan approved"
echo "[3] Verify rollback plan documented"
echo "[4] Verify monitoring alerts armed"
echo "[5] Verify on-call notified"

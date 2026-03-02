#!/usr/bin/env bash
# Beginner: switch traffic between blue/green environments.
# Advanced: rollback instantly by flipping active target.

set -euo pipefail

ACTIVE="${ACTIVE:-blue}"
if [[ "$ACTIVE" == "blue" ]]; then
  echo "Switching traffic to green"
else
  echo "Switching traffic to blue"
fi

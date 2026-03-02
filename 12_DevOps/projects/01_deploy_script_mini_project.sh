#!/usr/bin/env bash
# Beginner: linear deployment script example.
# Advanced: stop on failure and preserve release history with symlink switch.

set -euo pipefail

APP_DIR="${APP_DIR:-/srv/myapp}"
RELEASES_DIR="$APP_DIR/releases"
CURRENT_LINK="$APP_DIR/current"
NEW_RELEASE="$RELEASES_DIR/$(date +%Y%m%d%H%M%S)"

mkdir -p "$NEW_RELEASE"
echo "Copy build files to $NEW_RELEASE"
ln -sfn "$NEW_RELEASE" "$CURRENT_LINK"
echo "Deployment switched to: $NEW_RELEASE"

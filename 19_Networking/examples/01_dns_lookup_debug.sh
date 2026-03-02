#!/usr/bin/env bash
set -euo pipefail

DOMAIN=${1:-example.com}
nslookup "$DOMAIN"

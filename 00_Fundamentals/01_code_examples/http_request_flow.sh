#!/usr/bin/env bash
# Beginner: This script shows what happens when we make a simple HTTP request.
# Advanced: Using curl with timing flags helps profile DNS lookup, TCP connect,
# TLS handshake, and server response time from the client side.

set -euo pipefail

URL="${1:-https://example.com}"

echo "Requesting: $URL"
# Beginner: -I fetches only headers (faster and easier to inspect).
# Advanced: write-out exposes network timing useful for production debugging.
curl -I -sS "$URL" -o /dev/null -w 'dns=%{time_namelookup}s\nconnect=%{time_connect}s\ntls=%{time_appconnect}s\nfirst_byte=%{time_starttransfer}s\ntotal=%{time_total}s\n'

#!/bin/bash
# MD to PDF Converter - AppImage Wrapper
# This wrapper handles sandbox configuration for Linux systems

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
APPIMAGE="$SCRIPT_DIR/MD to PDF Converter-2.0.1.AppImage"

# Check if AppImage exists
if [ ! -f "$APPIMAGE" ]; then
  echo "Error: AppImage not found at $APPIMAGE"
  exit 1
fi

# Launch with sandbox disabled (required for AppImage on most Linux systems)
export ELECTRON_DISABLE_SANDBOX=1
"$APPIMAGE" "$@"

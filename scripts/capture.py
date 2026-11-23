#!/usr/bin/env python3
"""Run a project's capture tool from the repository root."""

import subprocess
import sys
from pathlib import Path

project = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
args = sys.argv[2:] if len(sys.argv) > 1 else sys.argv[1:]
capture = project / "tools" / "capture.mjs"

if not capture.exists():
    raise SystemExit(f"Missing capture tool: {capture}")

raise SystemExit(subprocess.call(["node", str(capture), *args], cwd=project))

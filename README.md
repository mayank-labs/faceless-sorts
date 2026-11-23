# Faceless Shorts: a free local video skill

Narrated faceless shorts (YouTube Shorts, TikTok, Reels) made 100% in code on your own computer: script, AI voice,
word-synced captions, animation, sound effects and music, rendered to MP4. No AI video, no API keys, no credits.

**Styles** (each has a style sheet, a style guide and a finished example video project)
1. **Deep Dive 3D** (flagship): Zack D. Films-like 3D "What happens if…?" explainers. Example: *What happens if you hold your breath?*
2. **Night File 3D**: unsolved mysteries and true crime in dark 3D rooms. Example: *The man who jumped out of a plane* (D.B. Cooper).
3. **Inside Out**: flat 2D x-ray explainers. Example: *What if you swallow gum?*
4. **Stick Story**: stick-figure survival steps. Example: *What if the power went out for 3 days?*
5. **Paper Atlas**: history in cut paper and maps. Example: *How one bakery burned down London*.
6. **Tall Tale 3D**: funny true stories, flat 2D cartoon people in a sunny 3D world. Example: *The girl who was mailed to grandma*.

**How it works**
script.json → Kokoro voice (local, free) → Whisper word timings (local, free) → shots drawn in code, each cut and caption
placed on its word → procedural sound + music → headless Chrome captures every frame → ffmpeg renders the MP4.
Claude checks a contact sheet of the whole video before you ever see it.
Optional: when you ask, Claude uploads the finished short to your YouTube channel through Zapier (it confirms title, visibility and category first).

## Stream Clips mode

This project also includes a `stream-clips` skill for turning long streams, VODs and videos
into ready-to-post vertical clips. It downloads audio first, transcribes locally with Whisper,
detects energetic moments, renders facecam/gameplay layouts with word-by-word captions, and
writes `POSTING.md` plus `clips.json`.

Run it from this repository:

```bash
python3 stream-clips/scripts/streamclips.py setup
python3 stream-clips/scripts/streamclips.py find --topic "Valorant"
python3 stream-clips/scripts/streamclips.py clip URL --topic "Valorant"
```

The stream workflow is documented in [`stream-clips/SKILL.md`](stream-clips/SKILL.md). Its
runtime files are in [`stream-clips/scripts/`](stream-clips/scripts/), and output is stored
in `~/StreamClips/`. Review every clip and confirm the creator permits clipping before posting.

**Needs:** Claude Code (or Claude with a linked computer), Node.js 22+, ffmpeg, Google Chrome, Python 3.10+, ~1 GB for the
voice and Whisper models. Claude installs what's missing.

**Windows:** run the scripts in Git Bash (installed with Git for Windows; Claude Code uses it already).

**Install:** put this folder at `~/.claude/skills/faceless-shorts/`, then run `bash setup/setup.sh` (prints "All set")
and `bash setup/selftest.sh` (prints "SELFTEST PASSED"). Start a new session and ask:
"Make a Deep Dive 3D short: what happens if you crack your knuckles?"

**Layout:**
- `SKILL.md`: AI workflow and project instructions
- `setup/`: setup and self-test scripts
- `scripts/`: setup, project creation, voice, transcription timing, and media helpers
- `styles/<style>/`: style guides, visual sheets, and complete working examples
- `stream-clips/`: the separate long-video and stream clipping pipeline
- `projects/<short-name>/`: generated shorts, sources, timing data, reviews, and renders
- `~/.faceless-shorts/`: private Python environment and downloaded voice/Whisper models

**Licenses:** the code, stories, drawings and sound are original and free to use in your videos. Inter font: SIL Open Font
License 1.1. Installed on first use: Kokoro-82M (Apache-2.0) via kokoro-onnx (MIT), faster-whisper + Whisper small.en (MIT),
numpy, scipy.

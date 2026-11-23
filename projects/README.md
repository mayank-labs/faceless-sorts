# Generated shorts

Each short is kept in its own folder:

```text
projects/what-if-one-eye/
├── script.json
├── src/
├── data/
├── review/
├── renders/
├── fonts/
├── tools/
└── index.html
```

- `script.json`: narration, captions, voice, music, and source facts
- `src/`: scene and shot code
- `data/`: narration, timing, cues, and mixed audio
- `review/`: contact sheets and key frames
- `renders/`: final MP4 files
- `tools/`: project-level capture and audio mixing commands

Create another short with:

```bash
bash scripts/new_video.sh deep-dive <short-name>
```

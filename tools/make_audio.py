"""Create the audioguide MP3 files with edge-tts, in Russian or French.

Reads the full story of each of the six places in the chosen language from
js/content.js (title + every paragraph, exactly as on the site, nothing
shortened) and saves one MP3 per place to audio/<lang>/<id>.mp3 with a
female voice: ru-RU-SvetlanaNeural or fr-FR-DeniseNeural.

Usage, from the project folder (see tools/README.md):
    python tools/make_audio.py --lang ru            create the missing files
    python tools/make_audio.py --lang fr --check    only show the texts, create nothing
    python tools/make_audio.py --lang fr --force    create all files again

edge-tts uses Microsoft's online voices, so an internet connection is needed.
"""

import argparse
import asyncio
import json
import re
import sys
from pathlib import Path

VOICES = {"ru": "ru-RU-SvetlanaNeural", "fr": "fr-FR-DeniseNeural"}
PLACES = ["gandhi", "chevtchenko", "tsoi", "pouchkine", "tselinny", "musee"]

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "js" / "content.js"

STRING = r'"((?:[^"\\]|\\.)*)"'


def js_string(raw):
    """Decode a double-quoted JavaScript string body."""
    return json.loads('"' + raw + '"')


def story(source, place_id, lang):
    """Title and paragraphs of a place's story in one language in content.js."""
    start = source.find('id: "%s"' % place_id)
    if start == -1:
        raise ValueError("place %r not found in content.js" % place_id)
    begin = source.find("story:", start)
    match = re.compile(
        lang + r":\s*\{\s*title:\s*" + STRING + r",\s*paragraphs:\s*\[(.*?)\]", re.S
    ).search(source, begin)
    if begin == -1 or not match:
        raise ValueError("%s story of %r not found in content.js" % (lang, place_id))
    title = js_string(match.group(1))
    paragraphs = [js_string(raw) for raw in re.findall(STRING, match.group(2))]
    if not paragraphs:
        raise ValueError("%s story of %r has no paragraphs" % (lang, place_id))
    return title, paragraphs


def speech_text(title, paragraphs):
    # Same reading order as the site: the title, then each paragraph.
    return "\n\n".join([title] + paragraphs)


def words(text):
    return re.findall(r"\w+", text.lower())


async def record(text, voice, temp):
    """Write the audio to temp; return the sentences the service reports as spoken."""
    import edge_tts

    spoken = []
    with open(temp, "wb") as audio:
        async for chunk in edge_tts.Communicate(text, voice).stream():
            if chunk["type"] == "audio":
                audio.write(chunk["data"])
            elif chunk["type"] in ("SentenceBoundary", "WordBoundary"):
                spoken.append(chunk["text"])
    return spoken


async def make_file(text, voice, path, attempts=3):
    """The service sometimes stops early without an error, so check that the
    last words of the text were spoken, and try again if they were not."""
    temp = path.with_suffix(".part")
    ending = words(text)[-3:]
    for attempt in range(1, attempts + 1):
        spoken = await record(text, voice, temp)
        heard = words(" ".join(spoken))[-len(ending):]
        if temp.stat().st_size > 0 and heard == ending:
            temp.replace(path)
            return
        print("(cut short, retrying %d/%d)" % (attempt, attempts - 1) if attempt < attempts else "", end=" ", flush=True)
    temp.unlink()
    raise RuntimeError("the recording stopped before the end of the text %d times" % attempts)


def main():
    parser = argparse.ArgumentParser(description="Create the audioguide MP3 files.")
    parser.add_argument("--lang", choices=sorted(VOICES), required=True, help="language of the recordings")
    parser.add_argument("--check", action="store_true", help="only show the texts, create nothing")
    parser.add_argument("--force", action="store_true", help="recreate files that already exist")
    args = parser.parse_args()

    voice = VOICES[args.lang]
    out_dir = ROOT / "audio" / args.lang
    source = CONTENT.read_text(encoding="utf-8")
    stories = {place: story(source, place, args.lang) for place in PLACES}

    if args.check:
        for place, (title, paragraphs) in stories.items():
            text = speech_text(title, paragraphs)
            print("=" * 70)
            print("%s: %d paragraphs, %d characters" % (place, len(paragraphs), len(text)))
            print("=" * 70)
            print(text)
            print()
        return 0

    try:
        import edge_tts  # noqa: F401
    except ImportError:
        print("edge-tts is not installed. Run:  python -m pip install edge-tts")
        return 1

    out_dir.mkdir(parents=True, exist_ok=True)
    print("Voice: %s" % voice)
    failed = []
    for place, (title, paragraphs) in stories.items():
        path = out_dir / (place + ".mp3")
        if path.exists() and path.stat().st_size > 0 and not args.force:
            print("skip     %s (already exists, use --force to recreate)" % path.relative_to(ROOT))
            continue
        print("creating %s ..." % path.relative_to(ROOT), end=" ", flush=True)
        try:
            asyncio.run(make_file(speech_text(title, paragraphs), voice, path))
        except Exception as error:  # network or service errors
            print("FAILED: %s" % error)
            failed.append(place)
            continue
        print("ok, %d KB" % (path.stat().st_size // 1024))

    print()
    for place in PLACES:
        path = out_dir / (place + ".mp3")
        size = path.stat().st_size if path.exists() else 0
        print("%-12s %s" % (place, "%d KB" % (size // 1024) if size else "MISSING"))
    if failed:
        print("\nSome files failed (%s). Check the internet connection and run the script again." % ", ".join(failed))
        return 1
    print("\nAll six files are in audio/%s/." % args.lang)
    return 0


if __name__ == "__main__":
    sys.exit(main())

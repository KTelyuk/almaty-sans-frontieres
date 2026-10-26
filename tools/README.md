# Tools

## Create the audioguide MP3 files (Russian and French)

`make_audio.py` reads the full story of each of the six places in one language
from `js/content.js` (title and every paragraph, nothing shortened or
rewritten) and creates `audio/<lang>/gandhi.mp3`, `chevtchenko.mp3`, `tsoi.mp3`,
`pouchkine.mp3`, `tselinny.mp3` and `musee.mp3` with a female voice (edge-tts):

| `--lang` | Folder      | Voice                  |
|----------|-------------|------------------------|
| `ru`     | `audio/ru/` | `ru-RU-SvetlanaNeural` |
| `fr`     | `audio/fr/` | `fr-FR-DeniseNeural`   |

The audioguide page plays them as soon as they exist; until then it shows
"Аудиозапись будет добавлена" / "Enregistrement audio à venir". The script checks
that each recording reaches the last words of the text and retries if the
service stopped early.

One-time setup (Windows):

1. Download Python from https://www.python.org/downloads/ and run the installer.
   On the first screen tick **"Add python.exe to PATH"**, then click
   **Install Now**.
2. Close and reopen PowerShell, then go to the project folder.
3. Install edge-tts:

   ```
   py -m pip install edge-tts
   ```

Each time you want to create the files (an internet connection is needed,
the voices are Microsoft's online voices):

1. Optional: check the texts that will be read, without creating anything
   (use `--lang fr` for French):

   ```
   py tools\make_audio.py --lang ru --check
   ```

2. Create the MP3 files (about one to three minutes per language):

   ```
   py tools\make_audio.py --lang ru
   py tools\make_audio.py --lang fr
   ```

   At the end the script lists the six files with their size. A file marked
   `MISSING` failed: run the command again, it only creates what is missing.
3. Open the audioguide page and press play.

If you change a text in `js/content.js`, recreate that language's files with
`--force`, for example `py tools\make_audio.py --lang fr --force`.

If `py` is not found, use `python` instead of `py` in the commands above.

## Refresh the "Confort du parcours" data

The cafés, drinking water points, benches, parks, toilets and transport stops on
`carte.html` come from a saved OpenStreetMap snapshot in `js/amenities-data.js`.
New or closed places only appear on the map after you refresh it.

1. Open PowerShell in the project folder (`site-almaty-culture`).
2. Run:

   ```
   powershell -ExecutionPolicy Bypass -File tools\update-osm-amenities.ps1
   ```

   It takes from one to a few minutes. If one server is busy it tries the next
   one. If all of them fail, the old file is left unchanged: just try again later.
   Some servers serve data that is months old. The script refuses to replace the
   file with older data; add `-Force` at the end only if you really want that.
3. In `js/content.js`, find the OpenStreetMap (Overpass API) entry near the end of
   `sources` and change its date (`26/10/2026` and `26.10.2026`) to the date the
   script printed. The map panel shows the new date by itself.
4. Open `carte.html`, turn on a category and check that places appear.

Notes

- The area covered is set by `$bbox` at the top of the script. It surrounds the
  six places with about 650 m of margin. Widen it if you add a place further away.
- The data is © OpenStreetMap contributors, under the ODbL licence. Keep the
  credit in the sources list.

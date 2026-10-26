<#
  Minimal static web server for previewing the site locally, with no Python
  or Node needed. Serves the project folder at http://localhost:8123/.

  Usage (from the project folder):
    powershell -ExecutionPolicy Bypass -File tools\serve.ps1
  Stop it with Ctrl+C.
#>
param(
  # The preview tool may pass a free port in $env:PORT.
  [int]$Port = $(if ($env:PORT) { [int]$env:PORT } else { 8123 }),
  [string]$Root = (Split-Path $PSScriptRoot -Parent)
)

$types = @{
  ".html" = "text/html; charset=utf-8"; ".css" = "text/css; charset=utf-8"; ".js" = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"; ".md" = "text/plain; charset=utf-8"; ".svg" = "image/svg+xml"
  ".png" = "image/png"; ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"; ".ico" = "image/x-icon"
  ".woff2" = "font/woff2"; ".mp3" = "audio/mpeg"
}
$rootFull = [IO.Path]::GetFullPath($Root)
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $rootFull at http://localhost:$Port/ (Ctrl+C to stop)"

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    try {
      $path = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath).TrimStart("/")
      if ($path -eq "" -or $path.EndsWith("/")) { $path += "index.html" }
      $file = [IO.Path]::GetFullPath((Join-Path $rootFull $path))
      # Only serve files inside the project folder.
      if ($file.StartsWith($rootFull, [StringComparison]::OrdinalIgnoreCase) -and (Test-Path $file -PathType Leaf)) {
        $bytes = [IO.File]::ReadAllBytes($file)
        $ext = [IO.Path]::GetExtension($file).ToLower()
        if ($types.ContainsKey($ext)) { $context.Response.ContentType = $types[$ext] }
        # Always revalidate, so a re-created file (photo, MP3) is never shown from an old cache.
        $context.Response.Headers["Cache-Control"] = "no-cache"
        # Byte ranges: browsers need them to seek in audio (the player's
        # progress bar); without them the slider jumps back to the start.
        $context.Response.Headers["Accept-Ranges"] = "bytes"
        $start = 0
        $end = $bytes.Length - 1
        $range = $context.Request.Headers["Range"]
        if ($range -match '^bytes=(\d*)-(\d*)$' -and $bytes.Length -gt 0) {
          if ($Matches[1] -ne "") {
            $start = [long]$Matches[1]
            if ($Matches[2] -ne "") { $end = [Math]::Min([long]$Matches[2], $bytes.Length - 1) }
          } elseif ($Matches[2] -ne "") {
            # "bytes=-500": the last 500 bytes.
            $start = [Math]::Max(0, $bytes.Length - [long]$Matches[2])
          }
          if ($start -gt $end) {
            $context.Response.StatusCode = 416
            $context.Response.Headers["Content-Range"] = "bytes */$($bytes.Length)"
            continue
          }
          $context.Response.StatusCode = 206
          $context.Response.Headers["Content-Range"] = "bytes $start-$end/$($bytes.Length)"
        }
        $count = $end - $start + 1
        $context.Response.ContentLength64 = $count
        $context.Response.OutputStream.Write($bytes, $start, $count)
      } else {
        $context.Response.StatusCode = 404
      }
    } catch {
      # A visitor closing the page mid-download is not an error worth stopping for.
    } finally {
      $context.Response.Close()
    }
  }
} finally {
  $listener.Stop()
}

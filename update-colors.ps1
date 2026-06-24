# Update all colors in App.tsx
$filePath = "src/app/App.tsx"
$content = Get-Content -Raw $filePath

# Color replacements: old -> new
$replacements = @{
    '#38b6ff' = '#D72323'    # secondary blue -> primary red
    '#1f5eff' = '#D72323'    # primary blue -> primary red
    '#e5f0ff' = '#F5EDED'    # light blue text -> cream
    'rgba(229,240,255,' = 'rgba(245,237,237,'  # light blue opacity -> cream opacity
    'rgba(31,94,255,' = 'rgba(215,35,35,'      # blue RGB -> red RGB
    'rgba(56,182,255,' = 'rgba(215,35,35,'     # blue RGB -> red RGB
    '#0b203c' = '#3E3636'    # secondary dark -> new secondary
    '#060f1e' = '#000000'    # dark background -> pure black
    '#00c2a8' = '#D72323'    # green accent -> red accent
}

foreach ($old in $replacements.Keys) {
    $new = $replacements[$old]
    $content = $content -replace [regex]::Escape($old), $new
}

$content | Set-Content $filePath
Write-Host "Color replacements completed successfully"

$base = 'https://thatisshayan.github.io/kilo-claude-landing-page/agents/'
$dest = 'D:\AgentDevWork\repos\AlphonsoEcosystemMarketing\assets'
$agents = 'echo','nova','sentinel','hector'

foreach ($a in $agents) {
  $url  = $base + $a + '.png'
  $out  = Join-Path $dest ($a + '.png')
  try {
    Invoke-WebRequest -Uri $url -OutFile $out -TimeoutSec 20 -UseBasicParsing
    $sz = (Get-Item $out).Length
    if ($sz -gt 10000) {
      Write-Host ("Downloaded $a : $([math]::Round($sz/1KB))KB") -ForegroundColor Green
    } else {
      Write-Host ("Too small, skipping $a") -ForegroundColor Yellow
      Remove-Item $out -Force
    }
  } catch {
    Write-Host ("Failed: $a - $_") -ForegroundColor Red
  }
}

# Also grab transparent logo
$logoUrl = 'https://thatisshayan.github.io/kilo-claude-landing-page/logo-transparent.png'
$logoOut = Join-Path $dest 'logo-transparent.png'
try {
  Invoke-WebRequest -Uri $logoUrl -OutFile $logoOut -TimeoutSec 15 -UseBasicParsing
  Write-Host "Got logo-transparent.png" -ForegroundColor Green
} catch {
  Write-Host "Logo failed" -ForegroundColor Red
}

Write-Host "`nDone." -ForegroundColor Cyan

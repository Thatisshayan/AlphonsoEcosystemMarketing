$dest  = 'D:\AgentDevWork\repos\AlphonsoEcosystemMarketing\assets'
$zip   = 'C:\Users\AgentDev\Downloads\OneDrive_2026-06-17.zip'
$tmp   = 'C:\Users\AgentDev\AppData\Local\Temp\alphonso-extract'

Write-Host 'Extracting zip...' -ForegroundColor Cyan
Expand-Archive -Path $zip -DestinationPath $tmp -Force

$imgs  = Join-Path $tmp 'Alphonso Marketing\Images'
$vids  = Join-Path $tmp 'Alphonso Marketing\Videos'
$icons = Join-Path $tmp 'Alphonso Marketing\App Icon'

$copies = @(
  @{ src = (Join-Path $imgs '01_team_mission_briefing.png');               dst = 'hero-banner.png' },
  @{ src = (Join-Path $imgs '09_final_hero_sunset.png');                   dst = 'cta-sunset.png'  },
  @{ src = (Join-Path $imgs '08_team_ready_to_launch.png');                dst = 'team-launch.png' },
  @{ src = (Join-Path $imgs '06_jose_strategy_insights.png');              dst = 'jose.png'        },
  @{ src = (Join-Path $imgs '05_miya_engagement_boost.png');               dst = 'miya.png'        },
  @{ src = (Join-Path $imgs '03_marcus_campaign_execution.png');           dst = 'marcus.png'      },
  @{ src = (Join-Path $imgs '07_maria_governance_approved.png');           dst = 'maria.png'       },
  @{ src = (Join-Path $imgs '04_hector_system_automation.png');            dst = 'hector.png'      },
  @{ src = (Join-Path $imgs '02_new_task_received.png');                   dst = 'alphonso.png'    },
  @{ src = (Join-Path $imgs 'ALPHONSO_THUMBNAIL.webp');                    dst = 'thumbnail.webp'  },
  @{ src = (Join-Path $imgs 'ALPHONSO_BANNER.webp');                       dst = 'banner.webp'     },
  @{ src = (Join-Path $imgs 'ALPHONSO_LOGO.webp');                         dst = 'logo.webp'       },
  @{ src = (Join-Path $vids 'alphonso_mission_story_clip.mp4');            dst = 'mission.mp4'     },
  @{ src = (Join-Path $icons 'alphonso_app_icon_06_main_master_1024.png'); dst = 'icon.png'        },
  @{ src = (Join-Path $icons 'favicon\favicon-32.png');                    dst = 'favicon.png'     },
  @{ src = (Join-Path $imgs 'ChatGPT Image Jun 7, 2026, 11_20_39 PM (1).png'); dst = 'hero-crew.png' }
)

foreach ($item in $copies) {
  Copy-Item $item.src (Join-Path $dest $item.dst) -Force
  Write-Host ('  Copied: ' + $item.dst) -ForegroundColor Green
}

Write-Host "`nAll assets copied to $dest" -ForegroundColor Cyan
Get-ChildItem $dest | Format-Table Name, @{N='KB';E={[math]::Round($_.Length/1KB)}}

Set-Location 'D:\AgentDevWork\repos\AlphonsoEcosystemMarketing'

Write-Host 'Initializing git...' -ForegroundColor Cyan
git init
git checkout -b main

git add .
git status

git commit -m "feat: launch AlphonsoEcosystemMarketing with mascots, agents, video"

Write-Host 'Creating GitHub repo and pushing...' -ForegroundColor Cyan
gh repo create AlphonsoEcosystemMarketing --public --source=. --remote=origin --push

Write-Host 'Done!' -ForegroundColor Green
Write-Host 'Repo live at: https://github.com/Thatisshayan/AlphonsoEcosystemMarketing' -ForegroundColor Yellow

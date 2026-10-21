$ErrorActionPreference = 'Stop'
# 더블클릭용 도우미: 키를 화면에 안 보이게 입력받아 캐시 수정 스크립트를 실행한다.
# 키는 이 창이 닫히면 사라지며 어디에도 저장되지 않는다.

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host ""
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "  기존 사진 캐시 1년으로 바꾸기" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Supabase에서 복사한 service_role 키를 붙여넣고 Enter를 누르세요."
Write-Host "(마우스 오른쪽 클릭 = 붙여넣기)" -ForegroundColor DarkGray
$secureKey = Read-Host "키"
$plainKey = $secureKey.Trim()

if ([string]::IsNullOrWhiteSpace($plainKey)) {
  Write-Host "`n키가 입력되지 않았습니다. 창을 닫고 다시 실행해 주세요." -ForegroundColor Red
  exit 1
}
$env:SUPABASE_SERVICE_ROLE_KEY = $plainKey

Write-Host "`n[1/2] 미리보기 (아무것도 바뀌지 않습니다)...`n" -ForegroundColor Yellow
node scripts/fix-storage-cache.mjs --dry-run
if ($LASTEXITCODE -ne 0) {
  Write-Host "`n미리보기에서 문제가 생겼습니다. 이 화면을 캡처해서 보여주세요." -ForegroundColor Red
  exit 1
}

Write-Host ""
$answer = Read-Host "위 목록대로 실제로 바꿀까요? (Y 입력 후 Enter / 그만두려면 그냥 Enter)"
if ($answer -notmatch '^[Yy]') {
  Write-Host "`n취소했습니다. 아무것도 바뀌지 않았습니다." -ForegroundColor DarkGray
  exit 0
}

Write-Host "`n[2/2] 실제 적용 중...`n" -ForegroundColor Yellow
node scripts/fix-storage-cache.mjs
if ($LASTEXITCODE -eq 0) {
  Write-Host "`n모두 완료! 이 화면 마지막 줄을 캡처해서 보여주세요." -ForegroundColor Green
} else {
  Write-Host "`n일부 실패가 있습니다. 이 화면을 캡처해서 보여주세요." -ForegroundColor Red
}

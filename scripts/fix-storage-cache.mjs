/**
 * 이미 업로드된 Storage 파일의 캐시 설정(1시간 → 1년)을 일괄 교체하는 1회성 스크립트
 *
 * 왜 필요한가?
 * - Supabase는 업로드 시점의 cacheControl 값을 파일마다 저장해 둔다.
 * - 코드만 고치면 '앞으로 올릴 파일'에만 적용되므로, 기존 파일은 같은 경로에
 *   다시 덮어써서(upsert) 캐시 설정만 바꿔야 한다.
 * - 경로(URL)가 그대로라 DB의 청첩장 데이터는 손댈 필요가 없다.
 *
 * 실행 방법 (PowerShell):
 *   $env:SUPABASE_SERVICE_ROLE_KEY="여기에_service_role_키"; node scripts/fix-storage-cache.mjs --dry-run
 *   $env:SUPABASE_SERVICE_ROLE_KEY="여기에_service_role_키"; node scripts/fix-storage-cache.mjs
 *
 * 보안: service_role 키는 '마스터키'이므로 파일에 저장하지 말고 실행할 때만 환경변수로 넘긴다.
 */
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const TARGET_BUCKETS = ['images', 'audio'];
const ONE_YEAR_IN_SECONDS = String(60 * 60 * 24 * 365);
const LIST_PAGE_SIZE = 100;
const IS_DRY_RUN = process.argv.includes('--dry-run');

/** .env에서 SUPABASE_URL만 읽어온다 (dotenv 의존성 추가 없이) */
function readSupabaseUrl() {
  const envText = readFileSync(new URL('../.env', import.meta.url), 'utf8');
  const match = envText.match(/^VITE_SUPABASE_URL=(.+)$/m);
  if (!match) throw new Error('.env에서 VITE_SUPABASE_URL을 찾을 수 없습니다.');
  return match[1].trim();
}

function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error('환경변수 SUPABASE_SERVICE_ROLE_KEY가 없습니다. (Supabase > Project Settings > API Keys)');
  }
  return createClient(readSupabaseUrl(), serviceKey, { auth: { persistSession: false } });
}

/** 폴더 안의 폴더까지 따라 들어가며 모든 파일 경로를 모은다 */
async function listAllFiles(storage, bucket, folder = '') {
  const files = [];
  for (let offset = 0; ; offset += LIST_PAGE_SIZE) {
    const { data, error } = await storage.from(bucket).list(folder, { limit: LIST_PAGE_SIZE, offset });
    if (error) throw new Error(`[${bucket}/${folder}] 목록 조회 실패: ${error.message}`);
    if (!data.length) break;

    for (const item of data) {
      const fullPath = folder ? `${folder}/${item.name}` : item.name;
      const isFolder = item.id === null; // Supabase는 폴더를 id 없는 항목으로 돌려준다
      if (isFolder) files.push(...(await listAllFiles(storage, bucket, fullPath)));
      else files.push({ path: fullPath, metadata: item.metadata ?? {} });
    }
    if (data.length < LIST_PAGE_SIZE) break;
  }
  return files;
}

/** 파일을 내려받아 같은 경로에 1년 캐시로 다시 덮어쓴다 */
async function reuploadWithLongCache(storage, bucket, file) {
  const { data: blob, error: downloadError } = await storage.from(bucket).download(file.path);
  if (downloadError) throw new Error(`다운로드 실패: ${downloadError.message}`);

  const { error: uploadError } = await storage.from(bucket).upload(file.path, blob, {
    upsert: true,
    cacheControl: ONE_YEAR_IN_SECONDS,
    // 원래 형식(jpeg/mp3 등)을 유지해야 브라우저가 정상 표시/재생한다
    contentType: file.metadata.mimetype || blob.type || undefined,
  });
  if (uploadError) throw new Error(`업로드 실패: ${uploadError.message}`);
}

async function main() {
  const { storage } = createAdminClient();
  const summary = { done: 0, skipped: 0, failed: 0 };

  for (const bucket of TARGET_BUCKETS) {
    const files = await listAllFiles(storage, bucket);
    console.log(`\n[${bucket}] 파일 ${files.length}개`);

    for (const file of files) {
      const alreadyLong = String(file.metadata.cacheControl || '').includes(ONE_YEAR_IN_SECONDS);
      if (alreadyLong) { summary.skipped++; continue; }

      if (IS_DRY_RUN) {
        console.log(`  (미리보기) ${file.path}  현재: ${file.metadata.cacheControl ?? '없음'}`);
        summary.done++;
        continue;
      }
      try {
        await reuploadWithLongCache(storage, bucket, file);
        summary.done++;
        console.log(`  ✓ ${file.path}`);
      } catch (err) {
        // 한 파일이 실패해도 나머지는 계속 처리 (실패 목록만 남김)
        summary.failed++;
        console.error(`  ✗ ${file.path} → ${err.message}`);
      }
    }
  }

  console.log(`\n${IS_DRY_RUN ? '[미리보기] 변경 대상' : '완료'}: ${summary.done}개 / 이미 1년: ${summary.skipped}개 / 실패: ${summary.failed}개`);
  if (summary.failed) process.exitCode = 1;
}

main().catch((err) => {
  console.error('\n중단됨:', err.message);
  process.exitCode = 1;
});

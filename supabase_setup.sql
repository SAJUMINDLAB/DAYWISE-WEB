-- 1. 청첩장 기본 데이터를 저장할 테이블
CREATE TABLE IF NOT EXISTS public.invitations (
    id TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 하객 방명록을 저장할 테이블
CREATE TABLE IF NOT EXISTS public.guestbooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id TEXT REFERENCES public.invitations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. 참석 의사(RSVP)를 저장할 테이블
CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id TEXT REFERENCES public.invitations(id) ON DELETE CASCADE,
    side TEXT NOT NULL,
    name TEXT NOT NULL,
    attend TEXT NOT NULL,
    companions TEXT,
    meal TEXT,
    contact TEXT,
    message TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 권한 설정 (누구나 읽고 쓸 수 있도록 테스트용으로 RLS를 해제합니다. 실제 서비스 시에는 정책 설정이 필요합니다.)
ALTER TABLE public.invitations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.guestbooks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps DISABLE ROW LEVEL SECURITY;

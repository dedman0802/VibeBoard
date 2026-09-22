# VibeBoard

Next.js + TypeScript + shadcn/ui 기반의 웹 게시판입니다.

## 기술 스택

- Next.js 16 (App Router, Server Actions)
- TypeScript
- Tailwind CSS + shadcn/ui
- Prisma ORM + Supabase Postgres (pg driver adapter)

## 시작하기

1. [Supabase](https://supabase.com)에서 프로젝트를 생성합니다.
2. Project Settings > Database > Connection string에서 커넥션 문자열을 확인합니다.
3. `.env.example`을 복사해 `.env`를 만들고 실제 값으로 채웁니다.

```bash
cp .env.example .env
```

- `DATABASE_URL`: 포트 6543(pgbouncer) 풀링 커넥션. 앱 런타임에서 사용합니다.
- `DIRECT_URL`: 포트 5432 다이렉트 커넥션. Prisma CLI(migrate 등)가 사용합니다.

4. 의존성 설치 후 스키마를 DB에 반영합니다.

```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

이후 스키마를 변경했다면 마이그레이션을 다시 적용하세요.

```bash
npx prisma migrate dev
```

## 기능

- 게시글 목록 (검색, 페이지네이션)
- 게시글 작성 / 수정 / 삭제
- 댓글 작성 / 삭제
- 조회수 집계

## 배포 시 참고

Supabase Postgres를 사용하므로 Vercel 등 서버리스 플랫폼에도 그대로 배포할 수
있습니다. 배포 환경에도 `DATABASE_URL`, `DIRECT_URL` 환경 변수를 설정하고,
배포 전 다음을 실행해 DB 스키마를 반영하세요.

```bash
npx prisma migrate deploy
```

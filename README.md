# VibeBoard

Next.js + TypeScript + shadcn/ui 기반의 웹 게시판입니다.

## 기술 스택

- Next.js 16 (App Router, Server Actions)
- TypeScript
- Tailwind CSS + shadcn/ui
- Prisma ORM + SQLite (better-sqlite3 driver adapter)

## 시작하기

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

DB 스키마를 변경했다면 마이그레이션을 적용하세요.

```bash
npx prisma migrate dev
```

## 기능

- 게시글 목록 (검색, 페이지네이션)
- 게시글 작성 / 수정 / 삭제
- 댓글 작성 / 삭제
- 조회수 집계

## 배포 시 참고

기본 구성은 SQLite 파일(`dev.db`)을 로컬 디스크에 저장합니다. Vercel과 같은
서버리스 플랫폼에 배포하면 파일 시스템이 요청 사이에 유지되지 않아 데이터가
보존되지 않습니다. 자체 서버(VPS, Docker 등)에 배포하거나, 서버리스로 배포할
경우 Postgres 등 외부 DB로 전환하는 것을 권장합니다. 배포 전 다음을 실행해
DB 스키마를 반영하세요.

```bash
npx prisma migrate deploy
```

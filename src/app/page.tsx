import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PAGE_SIZE = 10;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const q = params.q?.trim() ?? "";

  const where: Prisma.PostWhereInput = q
    ? {
        OR: [
          { title: { contains: q } },
          { content: { contains: q } },
          { author: { contains: q } },
        ],
      }
    : {};

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { _count: { select: { comments: true } } },
    }),
    prisma.post.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const buildHref = (targetPage: number) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (targetPage > 1) sp.set("page", String(targetPage));
    const qs = sp.toString();
    return qs ? `/?${qs}` : "/";
  };

  return (
    <div className="flex flex-col gap-6">
      <form action="/" className="flex gap-2">
        <Input
          type="text"
          name="q"
          placeholder="제목, 내용, 작성자 검색"
          defaultValue={q}
        />
        <Button type="submit">검색</Button>
      </form>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b px-4 py-3 text-sm font-medium text-muted-foreground">
            <span>제목</span>
            <span>작성자</span>
            <span>작성일</span>
          </div>
          {posts.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              등록된 글이 없습니다.
            </p>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post.id} className="border-b last:border-b-0">
                  <Link
                    href={`/posts/${post.id}`}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3 text-sm hover:bg-muted/50"
                  >
                    <span className="truncate font-medium">
                      {post.title}
                      {post._count.comments > 0 && (
                        <span className="ml-1 text-muted-foreground">
                          [{post._count.comments}]
                        </span>
                      )}
                    </span>
                    <span className="text-muted-foreground">{post.author}</span>
                    <span className="text-muted-foreground">
                      {formatDate(post.createdAt)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={buildHref(Math.max(1, page - 1))}
                aria-disabled={page === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink href={buildHref(p)} isActive={p === page}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={buildHref(Math.min(totalPages, page + 1))}
                aria-disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

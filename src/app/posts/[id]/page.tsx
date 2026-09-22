import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { incrementViews } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DeletePostButton } from "@/components/delete-post-button";
import { CommentSection } from "@/components/comment-section";

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { comments: { orderBy: { createdAt: "asc" } } },
  });

  if (!post) {
    notFound();
  }

  await incrementViews(postId);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">{post.title}</h1>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {post.author} · {formatDateTime(post.createdAt)}
            </span>
            <span>조회 {post.views + 1}</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="whitespace-pre-wrap py-6 text-sm leading-relaxed">
          {post.content}
        </CardContent>
        <CardContent className="flex justify-end gap-2 pt-0">
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/">목록</Link>}
          />
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href={`/posts/${post.id}/edit`}>수정</Link>}
          />
          <DeletePostButton postId={post.id} />
        </CardContent>
      </Card>

      <CommentSection postId={post.id} comments={post.comments} />
    </div>
  );
}

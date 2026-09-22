import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostForm } from "@/components/post-form";
import { updatePost } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>글 수정</CardTitle>
      </CardHeader>
      <CardContent>
        <PostForm
          action={updatePost.bind(null, postId)}
          defaultValues={post}
          showAuthor={false}
          cancelHref={`/posts/${postId}`}
          submitLabel="수정 완료"
        />
      </CardContent>
    </Card>
  );
}

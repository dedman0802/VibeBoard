import { PostForm } from "@/components/post-form";
import { createPost } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewPostPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>글쓰기</CardTitle>
      </CardHeader>
      <CardContent>
        <PostForm action={createPost} cancelHref="/" submitLabel="등록" />
      </CardContent>
    </Card>
  );
}

"use client";

import { useRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addComment, deleteComment } from "@/lib/actions";

type Comment = {
  id: number;
  content: string;
  author: string;
  createdAt: Date;
};

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function CommentSection({
  postId,
  comments,
}: {
  postId: number;
  comments: Comment[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold">댓글 {comments.length}개</h2>

      {comments.length > 0 && (
        <ul className="flex flex-col gap-3">
          {comments.map((comment) => (
            <li key={comment.id} className="rounded-lg border p-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{comment.author}</span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{formatDateTime(comment.createdAt)}</span>
                  <button
                    type="button"
                    className="hover:text-destructive"
                    onClick={() =>
                      startTransition(() => deleteComment(comment.id, postId))
                    }
                  >
                    삭제
                  </button>
                </div>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-foreground/90">
                {comment.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      <form
        ref={formRef}
        action={async (formData) => {
          await addComment(postId, formData);
          formRef.current?.reset();
        }}
        className="flex flex-col gap-2 rounded-lg border p-3"
      >
        <Input name="author" placeholder="작성자" required maxLength={50} />
        <Textarea
          name="content"
          placeholder="댓글을 입력하세요"
          required
          rows={3}
        />
        <div className="flex justify-end">
          <Button type="submit" size="sm" disabled={isPending}>
            댓글 등록
          </Button>
        </div>
      </form>
    </div>
  );
}

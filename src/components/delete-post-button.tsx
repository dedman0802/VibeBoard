"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deletePost } from "@/lib/actions";

export function DeletePostButton({ postId }: { postId: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive">삭제</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>글을 삭제할까요?</DialogTitle>
          <DialogDescription>
            삭제한 글은 복구할 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">취소</Button>} />
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => startTransition(() => deletePost(postId))}
          >
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

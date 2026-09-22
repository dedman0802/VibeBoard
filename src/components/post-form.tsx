import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PostForm({
  action,
  defaultValues,
  showAuthor = true,
  cancelHref,
  submitLabel = "등록",
}: {
  action: (formData: FormData) => void;
  defaultValues?: { title?: string; content?: string; author?: string };
  showAuthor?: boolean;
  cancelHref: string;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          name="title"
          required
          maxLength={200}
          defaultValue={defaultValues?.title}
        />
      </div>
      {showAuthor && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="author">작성자</Label>
          <Input
            id="author"
            name="author"
            required
            maxLength={50}
            defaultValue={defaultValues?.author}
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Label htmlFor="content">내용</Label>
        <Textarea
          id="content"
          name="content"
          required
          rows={10}
          defaultValue={defaultValues?.content}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href={cancelHref}>취소</Link>}
        />
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

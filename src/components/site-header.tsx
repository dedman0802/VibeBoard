import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          VibeBoard
        </Link>
        <Button nativeButton={false} render={<Link href="/posts/new">글쓰기</Link>} />
      </div>
    </header>
  );
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function requireString(formData: FormData, key: string): string {
  const value = formData.get(key);
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${key}는 필수 입력값입니다.`);
  }
  return value.trim();
}

export async function createPost(formData: FormData) {
  const title = requireString(formData, "title");
  const content = requireString(formData, "content");
  const author = requireString(formData, "author");

  const post = await prisma.post.create({
    data: { title, content, author },
  });

  revalidatePath("/");
  redirect(`/posts/${post.id}`);
}

export async function updatePost(postId: number, formData: FormData) {
  const title = requireString(formData, "title");
  const content = requireString(formData, "content");

  await prisma.post.update({
    where: { id: postId },
    data: { title, content },
  });

  revalidatePath("/");
  revalidatePath(`/posts/${postId}`);
  redirect(`/posts/${postId}`);
}

export async function deletePost(postId: number) {
  await prisma.post.delete({ where: { id: postId } });
  revalidatePath("/");
  redirect("/");
}

export async function incrementViews(postId: number) {
  await prisma.post.update({
    where: { id: postId },
    data: { views: { increment: 1 } },
  });
}

export async function addComment(postId: number, formData: FormData) {
  const content = requireString(formData, "content");
  const author = requireString(formData, "author");

  await prisma.comment.create({
    data: { content, author, postId },
  });

  revalidatePath(`/posts/${postId}`);
}

export async function deleteComment(commentId: number, postId: number) {
  await prisma.comment.delete({ where: { id: commentId } });
  revalidatePath(`/posts/${postId}`);
}

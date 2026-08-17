"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, checkPassword, createSessionToken, verifySessionToken } from "./adminAuth";
import { createPost, deletePost, updatePost } from "./blog";
import type { Locale } from "./routing";

// Defense in depth: the (protected) layout already gates page access, but a
// server action is still a callable network endpoint on its own, so each
// mutation re-checks auth independently rather than trusting the caller got
// here through the layout.
async function requireAdmin() {
  const store = await cookies();
  if (!verifySessionToken(store.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin/login");
  }
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  const store = await cookies();
  store.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function createPostAction(formData: FormData) {
  await requireAdmin();
  await createPost({
    lang: String(formData.get("lang")) as Locale,
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? ""),
    published: formData.get("published") === "on",
  });
  redirect("/admin");
}

export async function updatePostAction(id: number, formData: FormData) {
  await requireAdmin();
  await updatePost(id, {
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? ""),
    published: formData.get("published") === "on",
    slug: String(formData.get("slug") ?? "").trim(),
  });
  redirect("/admin");
}

export async function deletePostAction(id: number) {
  await requireAdmin();
  await deletePost(id);
  redirect("/admin");
}

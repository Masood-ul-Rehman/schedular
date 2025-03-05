import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getSession() {
  return await getServerSession();
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  return session.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return user;
}

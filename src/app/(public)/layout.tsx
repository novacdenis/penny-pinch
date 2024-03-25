import { redirect } from "next/navigation";
import { AuthLayout, auth } from "@/features/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return <AuthLayout>{children}</AuthLayout>;
}

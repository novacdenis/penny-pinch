import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <>
      <LoginForm />
    </>
  );
}

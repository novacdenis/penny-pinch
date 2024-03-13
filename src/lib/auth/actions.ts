import { signIn, signOut } from "@/lib/auth/index";

export const handleGithubLogin = async () => {
  "use server";
  return await signIn("github");
};
export const handleGoogleLogin = async () => {
  "use server";
  return await signIn("google");
};
export const handleLogout = async () => {
  "use server";
  return await signOut();
};

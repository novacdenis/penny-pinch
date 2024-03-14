"use server";

import { signIn, signOut } from "../lib";

export const handleGithubLogin = async () => {
  return await signIn("github");
};
export const handleGoogleLogin = async () => {
  return await signIn("google");
};
export const handleLogout = async () => {
  return await signOut();
};

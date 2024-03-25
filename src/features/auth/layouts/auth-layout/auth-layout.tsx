import Image from "next/image";
import { AuthLayoutBackground } from "./auth-layout-background";

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <AuthLayoutBackground />
      <div className="relative z-20 flex h-dvh flex-col items-center justify-center">
        <header className="flex flex-col items-center px-8">
          <Image
            priority
            src="/images/logo-white.svg"
            alt="Acorn"
            width={96}
            height={96}
            className="h-24 w-24 md:h-28 md:w-28"
          />
          <h1 className="mt-8 text-2xl font-medium md:text-3xl">Penny Pinch</h1>
          <h2 className="mt-1 text-muted-foreground md:text-lg">
            Please select an option to sign in
          </h2>
        </header>
        <main className="mt-10 px-8">{children}</main>
      </div>
    </>
  );
};

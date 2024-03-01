import Image from "next/image";
import Link from "next/link";
import { NavLink } from "./NavLink";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <header className="flex items-center space-x-5 p-5">
        <Link href="/">
          <Image src="/images/logo.png" alt="PennyPinch" width={48} height={48} />
        </Link>
        <nav className="flex h-12 items-center space-x-5 rounded-full bg-white/10 px-5 backdrop-blur-sm">
          <NavLink href="/">Overview</NavLink>
          <NavLink href="/">Banks</NavLink>
          <NavLink href="/">Settings</NavLink>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

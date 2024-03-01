import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/layouts/MainLayout/NavLink";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex items-center justify-between space-x-5 p-5">
        <div className="flex items-center space-x-5">
          <Link href="/">
            <Image src="/images/logo.png" alt="PennyPinch" width={48} height={48} />
          </Link>
          <nav className="flex h-12 items-center space-x-5 rounded-full bg-white/10 px-5 backdrop-blur-sm">
            <NavLink href="/">Overview</NavLink>
            <NavLink href="/banks">Banks</NavLink>
            <NavLink href="/settings">Settings</NavLink>
          </nav>
        </div>
        <div className="flex items-center space-x-5">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </Button>
          <div className="flex h-12 items-center rounded-full bg-white/10 px-1 backdrop-blur-sm">
            <Avatar>
              <AvatarImage src="https://github.com/novacdenis.png" alt="@shadcn" />
              <AvatarFallback>ND</AvatarFallback>
            </Avatar>
            <h3 className="px-4 font-medium">Hi, Denis</h3>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}

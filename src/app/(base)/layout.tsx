import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="PennyPinch"
            width={20}
            height={24}
            className="h-6 w-5"
          />
          <span className="ml-2 translate-y-0.5 font-medium">PennyPinch</span>
        </Link>
        <button className="flex items-center rounded-full bg-primary/5 p-1 transition-colors active:bg-primary/10">
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/novacdenis.png" />
            <AvatarFallback className="text-xs">ND</AvatarFallback>
          </Avatar>
          <span className="px-4 text-sm font-medium">Hi, Denis</span>
        </button>
      </header>
      <main className="py-5">{children}</main>
    </>
  );
}

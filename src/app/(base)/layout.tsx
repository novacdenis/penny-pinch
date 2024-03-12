import Image from "next/image";
import Link from "next/link";
import {
  DocumentArrowUpIcon,
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { ConfigLoader } from "@/app/(base)/ConfigLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConfigLoader />

      <header className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-white.svg"
            alt="PennyPinch"
            width={28}
            height={28}
            className="hidden size-7 dark:block"
          />
          <Image
            src="/images/logo-black.svg"
            alt="PennyPinch"
            width={28}
            height={28}
            className="block size-7 dark:hidden"
          />
          <span className="ml-2 translate-y-0.5 font-medium">PennyPinch</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center rounded-full bg-primary/5 p-1 transition-colors active:bg-primary/10 md:hover:bg-primary/10">
              <Avatar className="size-8">
                <AvatarImage src="https://github.com/novacdenis.png" />
                <AvatarFallback className="text-xs">ND</AvatarFallback>
              </Avatar>
              <span className="px-4 text-sm font-medium">Hi, Denis</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-56">
            <DropdownMenuItem>
              <DropdownMenuShortcut className="ml-0">
                <Cog6ToothIcon className="size-5" />
              </DropdownMenuShortcut>
              <span className="ml-2">Settings</span>
            </DropdownMenuItem>
            <Link href="/import">
              <DropdownMenuItem>
                <DropdownMenuShortcut className="ml-0">
                  <DocumentArrowUpIcon className="size-5" />
                </DropdownMenuShortcut>
                <span className="ml-2">Import</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DropdownMenuShortcut className="ml-0">
                <ArrowLeftStartOnRectangleIcon className="size-5" />
              </DropdownMenuShortcut>
              <span className="ml-2">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="py-5">{children}</main>
    </>
  );
}

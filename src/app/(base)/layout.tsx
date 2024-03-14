import Image from "next/image";
import Link from "next/link";
import {
  DocumentArrowUpIcon,
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { ConfigLoader } from "@/app/(base)/ConfigLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleGithubLogin, handleGoogleLogin, handleLogout } from "@/lib/auth/actions";
import { auth } from "@/lib/auth/index";

export default async function BaseLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const image = session?.user?.image || null;
  const name = session?.user?.name || "Error loading name.";

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

        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center rounded-full bg-primary/5 p-1 transition-colors active:bg-primary/10 md:hover:bg-primary/10">
                <Avatar className="size-8">
                  {image && <AvatarImage src={image} referrerPolicy="no-referrer" />}
                  <AvatarFallback className="text-xs">AV</AvatarFallback>
                </Avatar>
                <span className="px-4 text-sm font-medium">Hi, {name}</span>
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
                <form action={handleLogout} className="w-full">
                  <Button type="submit" variant="ghost" className="h-auto w-full justify-start p-0">
                    <DropdownMenuShortcut className="ml-0">
                      <ArrowLeftStartOnRectangleIcon className="size-5" />
                    </DropdownMenuShortcut>
                    <span className="ml-2">Logout</span>
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center rounded-full bg-primary/5 p-1 transition-colors active:bg-primary/10 md:hover:bg-primary/10">
                <Avatar className="size-8">
                  <AvatarFallback className="text-xs">
                    <KeyIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="px-4 text-sm font-medium">Login</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end" className="w-56">
              <DropdownMenuItem>
                <SSRButton action={handleGoogleLogin}>
                  <DropdownMenuShortcut className="ml-0">
                    <Cog6ToothIcon className="size-5" />
                  </DropdownMenuShortcut>
                  <span className="ml-2">Google</span>
                </SSRButton>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SSRButton action={handleGithubLogin}>
                  <DropdownMenuShortcut className="ml-0">
                    <DocumentArrowUpIcon className="size-5" />
                  </DropdownMenuShortcut>
                  <span className="ml-2">Github</span>
                </SSRButton>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </header>
      <main className="py-5">{children}</main>
    </>
  );
}

const SSRButton = ({ children, action }: { children: React.ReactNode; action: () => void }) => (
  <form action={action} className="w-full">
    <Button type="submit" variant="ghost" className="h-auto w-full justify-start p-0">
      {children}
    </Button>
  </form>
);

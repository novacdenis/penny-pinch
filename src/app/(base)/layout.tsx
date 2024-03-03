import Image from "next/image";
import Link from "next/link";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex h-16 items-center border-b border-b-primary/5 bg-black/10 backdrop-blur-md">
        <div className="container">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="PennyPinch" width={32} height={32} />
            <span className="ml-2 font-medium">PennyPinch</span>
          </Link>
        </div>
      </header>
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}

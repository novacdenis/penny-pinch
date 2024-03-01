"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/utils";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const variants = {
  active: { scale: 1 },
  inactive: { scale: 0 },
};

export const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn("flex items-center text-white/60 transition-colors hover:text-white", {
        "text-white": isActive,
      })}
    >
      <motion.span
        animate={isActive ? "active" : "inactive"}
        initial="inactive"
        variants={{
          active: { width: 8, height: 8, marginRight: 8, opacity: 1 },
          inactive: { width: 0, height: 0, marginRight: 0, opacity: 0 },
        }}
        className="block h-2 w-2 rounded-full bg-primary"
      />
      {typeof children === "string" ? <span>{children}</span> : children}
    </Link>
  );
};

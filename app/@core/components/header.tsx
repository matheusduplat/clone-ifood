"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
export function Header() {
  const { data } = useSession();
  return (
    <div className="flex justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="FWS Foods"
            fill
            className="object-cover"
          />
        </Link>
      </div>
      {data?.user?.name ? (
        <div className="flex">
          {data.user.name}
          <Button onClick={() => signOut()}>Sair</Button>
        </div>
      ) : (
        <Button onClick={() => signIn()}>Login</Button>
      )}

      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
}

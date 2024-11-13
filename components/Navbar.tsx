import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import React from "react";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Website logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden text-primary" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">LogOut</span>
                  <LogOut className="size-6 sm:hidden text-primary" />
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn({ provider: "github" });
              }}
            >
              <button type="submit">login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

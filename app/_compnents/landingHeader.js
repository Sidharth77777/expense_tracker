"use client";

import { SignedIn, SignedOut, UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from './../../public/images/logo.png'

export default function LandingHeader() {
  const { isLoaded, user } = useUser();
  const pathname = usePathname();

  // Exclude header on any sign-in or sign-up related pages
  const shouldHideHeader = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")
  const hideHeaderForDashBoard = pathname.startsWith("/dashboard")

  if (shouldHideHeader) {
    return null;
  }
  

  if(hideHeaderForDashBoard) {
    return null
  }

  return (
    <header className="px-6 mt-1 w-full flex justify-between items-center mb-10">
      <div>
        <Link href="/"><Image alt="logo" src={Logo} className="w-50" /></Link>
      </div>
      <div className="flex justify-center items-center">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="bg-green-700 sm:px-5 border-3 cursor-pointer border-green-600 rounded sm:p-2 sm:text-2xl text-base px-4 py-1">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}

import { SignedIn, SignedOut, UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import Logo from './../../../public/images/logo.png'

export default function DashBoardHeader(){

    const { isLoaded, user } = useUser();

    return (
  <header className="fixed top-0 left-0 right-0 z-50 h-16 px-6 flex justify-between items-center border-b border-white/10 backdrop-blur-sm bg-gradient-to-br from-[#0f172a] via-[#581c87] to-[#0f172a] bg-opacity-95 shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
      <div>
        <Link href="/"><Image alt="logo" src={Logo} className="w-50" /></Link>
      </div>
      <div className="flex justify-center items-center">
        <SignedIn>
          <span className="mx-2 text-base sm:text-xl">
            {user?.username
              ? user.username
              : user?.firstName
              ? user.firstName
              : user?.emailAddresses?.[0]?.emailAddress || "User"}
          </span>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="bg-green-700 px-5 border-3 cursor-pointer border-green-600 rounded p-2 text-2xl">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
    )
}
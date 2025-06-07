import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { CodeIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DashboardBtn from "./DashboardBtn";

function Navbar() {
  return (
    <nav className="w-full border-b py-4 px-6 flex justify-between items-center bg-background">
      <Link href="/" className="flex items-center gap-2 group">
        <CodeIcon className="h-6 w-6 text-blue-500 group-hover:text-cyan-400 transition-colors duration-300" />
        <span className="font-bold text-lg relative">
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Code
          </span>
          <span className="bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
            Vista
          </span>
          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <SignedIn>
        <div className="min-w-[40px] min-h-[40px] flex items-center justify-center">
          <DashboardBtn />
        </div>
        <div className="min-w-[40px] min-h-[40px] flex items-center justify-center">
          <ModeToggle />
        </div>
        <div className="min-w-[40px] min-h-[40px] flex items-center justify-center">
          <UserButton />
        </div>
        </SignedIn>

      </div>
    </nav>
  );
}
export default Navbar;

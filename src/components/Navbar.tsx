import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { CodeIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DashboardBtn from "./DashboardBtn";

/**
 * Navbar component - Main navigation bar for the CodeVista application
 * Displays the application logo and navigation controls
 * Uses authentication state to conditionally render user controls
 */
function Navbar() {
  return (
    <nav className="w-full border-b py-4 px-6 flex justify-between items-center bg-background">
      {/* Logo section with animated hover effects */}
      <Link href="/" className="flex items-center gap-2 group">
        {/* Code icon with color transition on hover */}
        <CodeIcon className="h-6 w-6 text-blue-500 group-hover:text-cyan-400 transition-colors duration-300" />

        {/* Logo text with gradient effects */}
        <span className="font-bold text-lg relative">
          {/* "Code" part with blue gradient */}
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Code
          </span>
          {/* "Vista" part with cyan to indigo gradient */}
          <span className="bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
            Vista
          </span>
          {/* Animated underline that expands on hover */}
          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
        </span>
      </Link>

      {/* Right side navigation controls */}
      <div className="flex items-center gap-4">
        {/* Only show these controls for authenticated users */}
        <SignedIn>
          {/* Dashboard button with container for consistent sizing */}
          <div className="min-w-[40px] min-h-[40px] flex items-center justify-center">
            <DashboardBtn />
          </div>
          {/* Theme toggle button with container for consistent sizing */}
          <div className="min-w-[40px] min-h-[40px] flex items-center justify-center">
            <ModeToggle />
          </div>
          {/* User profile button with container for consistent sizing */}
          <div className="min-w-[40px] min-h-[40px] flex items-center justify-center">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;

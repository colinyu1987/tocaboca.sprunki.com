'use client';

import Link from "next/link";
import { Home } from "lucide-react";

export default function BackToHomeButton() {
  return (
    <Link href="/" className="no-underline">
      <button className="bg-primary hover:bg-primary/90 text-primary-foreground border-none py-3.5 px-10 text-lg font-semibold transition-all duration-300 rounded-xl flex items-center mt-8 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 relative overflow-hidden">
        <Home className="mr-2 w-5 h-5 flex-shrink-0" />
        Back to Home
      </button>
    </Link>
  );
}
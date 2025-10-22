"use client";

import Link from "next/link";

export default function LegalHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b border-border/40 py-3">
      <div className="container">
        <nav className="flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Sprunki Rejoyed
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Home
          </Link>
        </nav>
      </div>
    </header>
  );
}

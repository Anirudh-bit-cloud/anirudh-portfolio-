import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-fg flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4">
        [ERROR 404 &bull; MISSING COORDINATE]
      </div>
      <h1 className="font-display text-6xl sm:text-8xl font-black uppercase tracking-tight text-fg">
        Not Found
      </h1>
      <p className="text-sm sm:text-base text-fg-muted max-w-md mt-3 mb-8 font-normal">
        The destination you requested has either moved or never existed.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-fg text-bg rounded font-mono text-xs uppercase font-bold tracking-wider hover:bg-accent hover:text-accent-contrast transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Index</span>
      </Link>
    </div>
  );
}

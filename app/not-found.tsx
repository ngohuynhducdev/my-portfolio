import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="relative min-h-svh overflow-hidden flex flex-col items-center justify-center gap-6 px-6 text-center">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <p className="text-7xl sm:text-8xl font-bold text-primary tabular-nums">
        404
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
        Page not found
      </h1>
      <p className="text-muted-foreground max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button variant="cta" size="cta" render={<Link href="/" />}>
        <ArrowLeft size={16} />
        Back to home
      </Button>
    </main>
  );
}

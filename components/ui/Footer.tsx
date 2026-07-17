import { PERSONAL_INFO, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-xs">
          <p className="font-semibold text-foreground">
            © {new Date().getFullYear()}, {PERSONAL_INFO.name}
          </p>
          <a
            href={SITE.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            see the recent update on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

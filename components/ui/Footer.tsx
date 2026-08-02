import { PERSONAL_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <p className="py-8 text-xs font-semibold text-foreground">
          © {new Date().getFullYear()}, {PERSONAL_INFO.name}
        </p>
      </div>
    </footer>
  );
}

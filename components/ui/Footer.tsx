import { PERSONAL_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-8 flex items-center justify-center text-xs">
          <p className="font-semibold text-foreground">
            © {new Date().getFullYear()}, {PERSONAL_INFO.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

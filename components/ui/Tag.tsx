/** Small tech chip — shared by the experience entries and the project cards. */
export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-0.5 rounded-md bg-secondary border border-border text-xs text-muted-foreground">
      {children}
    </span>
  );
}

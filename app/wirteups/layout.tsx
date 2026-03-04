import './writeups-theme.css';

export default function WriteupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="writeups-theme h-screen bg-background text-foreground overflow-y-auto">
      {children}
    </div>
  );
}

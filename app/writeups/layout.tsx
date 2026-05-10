import './writeups-theme.css';
import { CyberPageShell } from '@/components/shared/CyberPageShell';

export default function WriteupsLayout({ children }: { children: React.ReactNode }) {
  return <CyberPageShell contentClassName="writeups-theme">{children}</CyberPageShell>;
}

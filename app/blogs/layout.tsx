import './blogs-theme.css';
import { CyberPageShell } from '@/components/shared/CyberPageShell';

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <CyberPageShell contentClassName="blogs-theme">{children}</CyberPageShell>;
}

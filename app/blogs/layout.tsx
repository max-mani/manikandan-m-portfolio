import './blogs-theme.css';
import { CRTOverlay } from '@/components/shared/CRTOverlay';
import { MatrixRain } from '@/components/shared/MatrixRain';

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="blogs-theme h-screen overflow-y-auto overflow-x-hidden"
      style={{
        background: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]">
        <MatrixRain opacity={1} />
      </div>
      <CRTOverlay />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

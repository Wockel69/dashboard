import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/sidebar';

export const metadata: Metadata = {
  title: 'InstaGrowth - Instagram-Analyse Dashboard',
  description: 'Analysiere und optimiere dein Instagram-Wachstum mit InstaGrowth',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="main-content flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

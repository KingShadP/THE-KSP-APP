import type {Metadata} from 'next';
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google';
import { CustomCursor } from '@/components/CustomCursor';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'KINGSHADP | THE VAULT',
  description: 'The digital artifact and creative sanctuary of KingShadP.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${mono.variable} bg-[#0A0002] text-[#E5E4E2] dark`}>
      <body className="font-sans antialiased min-h-screen bg-[#0A0002] selection:bg-[#B76E79]/30 selection:text-[#F8F8FF]" suppressHydrationWarning>
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

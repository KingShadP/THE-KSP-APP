import './globals.css';
import { Cursor } from '../components/Cursor';
import { AudioProvider } from '../components/AudioProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}

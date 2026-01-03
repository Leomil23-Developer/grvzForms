import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GRVZ Form',
  description: 'Professional Yamaha registration form with secure data handling',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

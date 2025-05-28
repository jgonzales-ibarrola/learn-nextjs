import '@/app/ui/global.css'
import { inter } from './ui/fonts';
import {Toaster } from 'react-hot-toast'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}><Toaster />{children}</body>
    </html>
  );
}

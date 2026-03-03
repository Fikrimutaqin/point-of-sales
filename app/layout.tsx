import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
          <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-black/60">
            <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
              <div className="text-base font-semibold">Point of Sales</div>
              <nav className="text-sm text-gray-600 dark:text-gray-300">Menu</nav>
            </div>
          </header>
          <main className="mx-auto max-w-5xl p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}

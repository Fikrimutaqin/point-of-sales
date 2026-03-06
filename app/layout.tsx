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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Initial theme script */}
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html:
              `(function(){try{var d=document.documentElement;var s=localStorage.getItem('theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var pref = s ? s : (m ? 'dark' : 'light'); if(pref==='dark'){d.classList.add('dark'); d.classList.remove('light');}else{d.classList.add('light'); d.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <main className="w-full flex flex-col">{children}</main>
      </body>
    </html>
  );
}

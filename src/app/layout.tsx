import type { Metadata } from "next";
import "./globals.css";
import {Fugaz_One, Open_Sans} from "next/font/google";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Logout from "@/components/Logout";

export const metadata: Metadata = {
  title: "Moodly",
  description: "Track your mood everyday to improve your mental health!",
};

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400",});
const openSans = Open_Sans({ subsets: ["latin"]});

const header = (
  <header className='px-4 py-2 sm:py-4 sm:p-8 flex items-center justify-between gap-4'>
    <Link href='/'>
    <h1 className={ 'text-base sm:text-4xl textGradient ' + fugaz.className}>Moodly</h1>
    </Link>
    <Logout />
  </header>
)

const footer = (
  <footer className={'p-4 sm:p-8 grid place-items-center '+ fugaz.className}>
    <p>created with 🧡 by <Link className="text-sm textGradient" href='https://github.com/panchambopanna' target="_blank">/panchambopanna</Link></p>
  </footer>
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <AuthProvider>
      <body className={"w-full max-w-[1200px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700 " + openSans.className}>
        {header}
        {children}
        {footer}
      </body>
      </AuthProvider>
    </html>
  );
}

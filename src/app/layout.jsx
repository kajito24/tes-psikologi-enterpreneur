import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Tes Psikologi Entrepeneur | KREKI",
  description:
    "Temukan kepribadian dan potensi entrepreneur Anda dengan tes psikologi komprehensif kami. Dapatkan wawasan tentang kekuatan, kelemahan, dan mindset entrepreneur Anda dengan Tes Psikologi Entrepeneur.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background justify-center flex`}
      >
        {children}
      </body>
    </html>
  );
}

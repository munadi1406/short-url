import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

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
  title: 'Shorten Your URL - URL Shortener',
  description: 'Easily shorten your long URLs with our free and simple URL shortener. Just paste your URL and get a shortened link in seconds!',
  openGraph: {
    title: 'Shorten Your URL - URL Shortener',
    description: 'Easily shorten your long URLs with our free and simple URL shortener. Just paste your URL and get a shortened link in seconds!',
    images: ['/path-to-your-og-image.jpg'], // Ganti dengan gambar Open Graph yang sesuai
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
  twitter: {
    card: 'summary_large_image',
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <div className="relative top-0  w-screen left-1/2 transform -translate-x-1/2 z-50">

          <Script
            id="adsterra-banner"
            strategy="lazyOnload" // Script akan dimuat saat halaman selesai memuat
          >
            {`
              atOptions = {
                'key' : 'c3e82ae562c983a4a204dc857f473def',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            `}
          </Script>
          <Script
            id="adsterra-invoke"
            strategy="lazyOnload"
            src="//www.topcpmcreativeformat.com/c3e82ae562c983a4a204dc857f473def/invoke.js"
          />

          <Script async="async" data-cfasync="false" src="//pl24748248.cpmrevenuegate.com/558f342bf47b0fe5dc036c0091fd4b80/invoke.js"></Script>
          <div id="container-558f342bf47b0fe5dc036c0091fd4b80"></div>

        </div>

        {children}
      </body>
    </html>
  );
} 

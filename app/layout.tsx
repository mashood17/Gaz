import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://royalgazebo.com'),
  title: 'Royal Gazebo Restaurant | A Royal Taste in Every Bite | Mangaluru',
  description:
    'Experience authentic flavours, royal dining ambience, and warm hospitality at Royal Gazebo Restaurant, Mischief Mall, Mangaluru. Home delivery and parking available.',
  icons: {
    icon: '/images/royal_gazebo_logo.png',
    apple: '/images/royal_gazebo_logo.png',
  },
  openGraph: {
    title: 'Royal Gazebo Restaurant | Mangaluru',
    description: 'A Royal Taste in Every Bite. Authentic dining at Mischief Mall, Mangaluru.',
    url: 'https://royalgazebo.com',
    siteName: 'Royal Gazebo Restaurant',
    images: [
      {
        url: '/images/royal_gazebo_logo.png',
        width: 1024,
        height: 1024,
        alt: 'Royal Gazebo Restaurant Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0704',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="bg-[#0B0704] text-[#F6E6C9] font-sans antialiased selection:bg-[#F4B24D]/30 selection:text-[#F4B24D] overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}

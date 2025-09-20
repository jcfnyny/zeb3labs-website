import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Zeb3Labs - DeFi Innovation Platform',
  description: 'Pioneering the future of decentralized finance with innovative solutions, security-first approach, and community-driven development.',
  keywords: 'DeFi, decentralized finance, blockchain, cryptocurrency, web3, fintech, Zeb3Labs',
  authors: [{ name: 'Zeb3Labs' }],
  creator: 'Zeb3Labs',
  publisher: 'Zeb3Labs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zeb3labs.io',
    title: 'Zeb3Labs - DeFi Innovation Platform',
    description: 'Pioneering the future of decentralized finance with innovative solutions, security-first approach, and community-driven development.',
    siteName: 'Zeb3Labs',
    images: [
      {
        url: 'https://zeb3labs.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zeb3Labs - DeFi Innovation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zeb3Labs - DeFi Innovation Platform',
    description: 'Pioneering the future of decentralized finance with innovative solutions.',
    images: ['https://zeb3labs.io/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
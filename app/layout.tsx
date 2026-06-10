import type { Metadata } from 'next'
import { Newsreader, Source_Sans_3, Source_Code_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const newsreader = Newsreader({ 
  subsets: ["latin"],
  variable: '--font-newsreader',
  display: 'swap',
});

const sourceSans = Source_Sans_3({ 
  subsets: ["latin"],
  variable: '--font-source-sans',
  display: 'swap',
});

const sourceCode = Source_Code_Pro({ 
  subsets: ["latin"],
  variable: '--font-source-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NODUS — El conocimiento no es lineal',
  description: 'Explora materias universitarias como una red de conceptos interconectados. Cada nodo se adapta a tu carrera profesional.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${newsreader.variable} ${sourceSans.variable} ${sourceCode.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

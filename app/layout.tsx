import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'INNOVI Solutions | The Forge for Custom Software & AI Automation Solutions',
    template: '%s | INNOVI Solutions',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'custom software development',
    'AI agents',
    'SaaS development',
    'data engineering',
    'automation',
    'INNOVI Solutions',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'INNOVI Solutions | The Forge for Custom Software & AI',
    description:
      'A dev shop building custom software, SaaS, data systems, and AI agents, then hosting and maintaining what it ships.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INNOVI Solutions | The Forge for Custom Software & AI',
    description:
      'A dev shop building custom software, SaaS, data systems, and AI agents, then hosting and maintaining what it ships.',
  },
}

export const viewport = {
  themeColor: '#fafaf9',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Defined inside the component, not at module scope: a module-level const
  // here previously broke Vercel's production build ("ReferenceError:
  // organizationJsonLd is not defined") while prerendering /_not-found -
  // keeping it in the component's own scope avoids relying on the bundler
  // linking a module-level const across chunks for that special route.
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/innovi-logo.png`,
    description: SITE_DESCRIPTION,
    email: 'queries@innovi-solutions.com',
  }

  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

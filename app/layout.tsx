import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'INNOVI Solutions | The Forge for Custom Software & AI Automation Solutions',
  description:
    'INNOVI SOLUTIONS designs and builds custom software, SaaS, data systems, and AI agents shaped around how your business actually operates, plus hosting and maintenance.',
  keywords: [
    'custom software development',
    'AI agents',
    'SaaS development',
    'data engineering',
    'automation',
    'INNOVI Solutions',
  ],
  openGraph: {
    title: 'INNOVI Solutions | The Forge for Custom Software & AI',
    description:
      'A dev shop building custom software, SaaS, data systems, and AI agents, then hosting and maintaining what it ships.',
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
  themeColor: '#14213d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

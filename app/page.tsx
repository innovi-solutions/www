import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { WhatWeDo } from '@/components/what-we-do'
import { Work } from '@/components/work'
import { HowWeWork } from '@/components/how-we-work'
import { Trust } from '@/components/trust'
import { Process } from '@/components/process'
import { About } from '@/components/about'
import { TechStack } from '@/components/tech-stack'
import { FinalCta } from '@/components/final-cta'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <WhatWeDo />
        <Work />
        <HowWeWork />
        <Trust />
        <Process />
        <About />
        <TechStack />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}

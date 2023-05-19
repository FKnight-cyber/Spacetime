import './globals.css'
import React from 'react'
import { Roboto_Flex as Roboto, Bai_Jamjuree as Bai } from 'next/font/google'
import Hero from '@/components/Hero'
import Profile from '@/components/Profile'
import SignIn from '@/components/SignIn'
import Copyright from '@/components/Copyright'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const bai = Bai({ subsets: ['latin'], weight: '700', variable: '--font-bai' })

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construída com Node.js, React, Next.js, Tailwind e Typescript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = cookies().has('token')
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${bai.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          <div className="relative flex flex-col items-start justify-between border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-purple-700 opacity-50 blur-full" />
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />
            {isAuthenticated ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>
          <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

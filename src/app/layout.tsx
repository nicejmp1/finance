// src/app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/common/header/Header'
import { defaultMetadata } from '@/lib/metadata';

export const metadata = defaultMetadata

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}
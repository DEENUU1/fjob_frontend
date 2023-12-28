import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Provider from '@/redux/provider';
import { Setup } from '@/components/utils';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FJob',
  description: 'Fjob is an open source platform that allows you to quickly find a job, save interesting job offers, apply and discover new opportunities every day',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider>
          <Setup />

          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}

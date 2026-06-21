import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HUMAN — 10 October 2026 · Lisbon',
  description: 'A full-day event at Parque das Nações, Lisbon. Saturday 10 October 2026, 10:00–20:00. General Admission €99.',
  openGraph: {
    title: 'HUMAN — 10 October 2026 · Lisbon',
    description: 'Saturday 10 October 2026 · 10:00–20:00 · Parque das Nações, Lisbon · €99',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0D1B3E',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

interface Ticket {
  id: string
  qr_code: string
  quantity: number
  attendee_name: string | null
  attendee_email: string | null
  created_at: string
}

export default function QRTicket({ ticket }: { ticket: Ticket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, ticket.qr_code, {
        width: 200,
        margin: 2,
        color: { dark: '#0D1B3E', light: '#F0E8CE' },
      })
    }
  }, [ticket.qr_code])

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #FAE0CC, #f5cdb0)',
        border: '2px solid var(--coral)',
      }}
    >
      {/* Ticket top */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-display text-3xl" style={{ color: 'var(--navy)' }}>HUMAN</p>
            <p className="text-xs mt-1" style={{ color: 'var(--coral)' }}>
              General Admission · {ticket.quantity}×
            </p>
          </div>
          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{ background: 'var(--navy)', color: 'var(--cream)' }}
          >
            ADMIT
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs" style={{ color: 'var(--navy)' }}>
          <div>
            <p className="opacity-50 uppercase tracking-wide text-[10px]">Date</p>
            <p className="font-medium">Saturday 10.10.26</p>
          </div>
          <div>
            <p className="opacity-50 uppercase tracking-wide text-[10px]">Time</p>
            <p className="font-medium">10:00 – 20:00</p>
          </div>
          <div>
            <p className="opacity-50 uppercase tracking-wide text-[10px]">Venue</p>
            <p className="font-medium">Parque das Nações</p>
          </div>
          <div>
            <p className="opacity-50 uppercase tracking-wide text-[10px]">City</p>
            <p className="font-medium">Lisbon, Portugal</p>
          </div>
        </div>
      </div>

      {/* Perforated divider */}
      <div className="flex items-center px-4 py-1">
        <div className="w-5 h-5 rounded-full -ml-7" style={{ background: 'var(--navy)' }} />
        <div className="flex-1 border-t-2 border-dashed mx-2" style={{ borderColor: 'rgba(13,27,62,0.2)' }} />
        <div className="w-5 h-5 rounded-full -mr-7" style={{ background: 'var(--navy)' }} />
      </div>

      {/* QR Code */}
      <div className="flex flex-col items-center px-5 pb-5 pt-2">
        <canvas ref={canvasRef} className="rounded-lg" />
        {ticket.attendee_name && (
          <p className="mt-3 text-sm font-medium" style={{ color: 'var(--navy)' }}>
            {ticket.attendee_name}
          </p>
        )}
        <p className="mt-1 text-[10px] opacity-40" style={{ color: 'var(--navy)' }}>
          #{ticket.qr_code.slice(0, 8).toUpperCase()}
        </p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { createPortal } from 'react-dom'

function Modal({ onClose }) {
  return createPortal(
    <div style={{ position: 'fixed', top: 40, right: 40, background: '#fff', padding: '1rem', border: '1px solid #ddd' }}>
      <p>This modal is rendered via Portal.</p>
      <button onClick={onClose}>Close</button>
    </div>,
    document.body,
  )
}

export default function PortalExample() {
  const [open, setOpen] = useState(false)
  return (
    <section>
      <button onClick={() => setOpen(true)}>Open Portal Modal</button>
      {open && <Modal onClose={() => setOpen(false)} />}
    </section>
  )
}

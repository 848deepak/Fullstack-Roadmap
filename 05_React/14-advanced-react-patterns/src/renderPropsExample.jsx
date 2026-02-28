import { useState } from 'react'

function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  return (
    <div onMouseMove={(event) => setPosition({ x: event.clientX, y: event.clientY })}>
      {render(position)}
    </div>
  )
}

export default function RenderPropsExample() {
  return <MouseTracker render={(position) => <p>{position.x}, {position.y}</p>} />
}

'use client';

import { useEffect, useState } from 'react';

// Beginner: avoid rendering Date.now() directly during SSR to prevent mismatch.
// Advanced: render stable placeholder first, then hydrate client-only dynamic value.
export default function HydrationSafeClock() {
  const [time, setTime] = useState<string>('Loading time...');

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <section>
      <h2>Hydration-Safe Clock</h2>
      <p>{time}</p>
    </section>
  );
}

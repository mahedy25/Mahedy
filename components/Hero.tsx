'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export default function Home() {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const xPercent = useRef(0);
  const direction = useRef(-1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Watch scroll direction to flip animation
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: window.innerHeight,
      scrub: 0.25,
      onUpdate: (self) => {
        direction.current = self.direction * 1;
      },
    });

    // Smooth ticker-based animation
    const speed = 0.1;

    gsap.ticker.add(() => {
      xPercent.current += speed * direction.current;
      if (xPercent.current < -100) {
        xPercent.current = 0;
      } else if (xPercent.current > 0) {
        xPercent.current = -100;
      }

      gsap.set(firstText.current, { xPercent: xPercent.current });
      gsap.set(secondText.current, { xPercent: xPercent.current });
    });

    return () => {
      gsap.ticker.remove(() => {});
    };
  }, []);

  return (
    <main className="relative flex h-screen mb-[100vh] overflow-hidden">
      <Image
        src="/images/background.jpg"
        alt="background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute top-[calc(100vh-350px)]">
        <div ref={slider} className="relative whitespace-nowrap">
          <p
            ref={firstText}
            className="text-white text-[230px] font-medium pr-[50px] m-0 relative"
          >
            Freelance Developer -
          </p>
          <p
            ref={secondText}
            className="text-white text-[230px] font-medium pr-[50px] m-0 absolute left-full top-0"
          >
            Freelance Developer -
          </p>
        </div>
      </div>
    </main>
  );
}

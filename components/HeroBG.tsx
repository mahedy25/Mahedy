"use client";
import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export const HeroBG = React.memo(({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;

    const particles = particlesContainer.querySelectorAll<HTMLDivElement>(".particle");

    // Animate particles to float upward
    particles.forEach((p) => {
      gsap.fromTo(
        p,
        {
          y: "100%",
          opacity: 0.4,
        },
        {
          y: "-100%",
          opacity: 0,
          repeat: -1,
          duration: gsap.utils.random(4, 8),
          delay: gsap.utils.random(0, 3),
          ease: "sine.inOut",
        }
      );
    });

    // Mouse movement parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / 40;
      const moveY = (clientY - centerY) / 40;

      gsap.to(particlesContainer, {
        x: moveX,
        y: moveY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden z-[-1]", className)}>
      {/* Animated Wave */}
      <motion.svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          fill="#0f0f0f"
          fillOpacity="1"
          d="M0,160L60,149.3C120,139,240,117,360,101.3C480,85,600,75,720,85.3C840,96,960,128,1080,133.3C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </motion.svg>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
              filter: "blur(1.2px)",
            }}
          />
        ))}
      </div>
    </div>
  );
});

HeroBG.displayName = "HeroBG";
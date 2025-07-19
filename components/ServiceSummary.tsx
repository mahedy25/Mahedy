"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceSummary() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const containers = gsap.utils.toArray(".service-item-container") as HTMLElement[];

    // Gentle offset
    gsap.set(containers.filter((_, i) => (i + 1) % 2 !== 0), { xPercent: -10 });
    gsap.set(containers.filter((_, i) => (i + 1) % 2 === 0), { xPercent: 10 });

    gsap.set(".divider", { autoAlpha: 0 });

    containers.forEach((container, i) => {
      const isOdd = (i + 1) % 2 !== 0;

      // Smooth scroll-linked animation
      gsap.to(container, {
        xPercent: isOdd ? 10 : -10,
        ease: "power1.out",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5, // adds slight delay for smooth feel
        },
      });

      // Divider fade-in
      gsap.to(container.querySelectorAll(".divider"), {
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope: containerRef });

  return (
    <main
  ref={containerRef}
  className="mt-20 overflow-hidden font-light leading-snug text-center mb-24 contact-text-responsive"
>
  {/* First Row */}
  <div className="service-item-container">
    <p className="service-item text-4xl md:text-5xl lg:text-7xl">Design</p>
  </div>

  {/* Second Row */}
  <div className="service-item-container flex items-center justify-center gap-3 mt-4 md:mt-6">
    <p className="service-item font-normal text-2xl md:text-3xl lg:text-5xl">Innovative</p>
    <div className="divider w-10 h-0.5 md:w-20 bg-[#004D4D]" />
    <p className="service-item text-2xl md:text-3xl lg:text-5xl">Responsive</p>
  </div>

  {/* Third Row */}
  <div className="service-item-container flex items-center justify-center gap-3 mt-4 md:mt-6">
    <p className="service-item text-xl md:text-2xl lg:text-4xl">Dynamic</p>
    <div className="divider w-10 h-0.5 md:w-20 bg-[#004D4D]" />
    <p className="service-item italic text-xl md:text-2xl lg:text-4xl">Efficient</p>
    <div className="divider w-10 h-0.5 md:w-20 bg-[#004D4D]" />
    <p className="service-item text-xl md:text-2xl lg:text-4xl">Pixel-perfect</p>
  </div>

  {/* Fourth Row */}
  <div className="service-item-container mt-4 md:mt-6">
    <p className="service-item text-lg md:text-xl lg:text-3xl">Scalable

</p>
  </div>
</main>

  );
}

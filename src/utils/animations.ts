import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useStaggerAnimation = (items: any[]) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && items.length > 0) {
      const children = ref.current.children;
      gsap.fromTo(
        Array.from(children),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [items]);

  return ref;
};


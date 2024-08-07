"use client";
import { Button } from "@/components/Button";
import starBg from "@/assets/stars.png";
import gridLined from "@/assets/grid-lines.png";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

// making a custom hook to track the mouse relative position

const useMousePosition = (to: RefObject<HTMLElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // using useEffect to track the mouse relative position

  const updateMousePosition = (event: MouseEvent) => {
    if (!to.current) return;

    const { top, left } = to.current.getBoundingClientRect();
    mouseX.set(event.x - left);
    mouseY.set(event.y - top);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [to]);

  return [mouseX, mouseY];
};

export const CallToAction = () => {
  const imageRef = useRef(null);
  const borderedRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  const [mouseX, mouseY] = useMousePosition(borderedRef);

  const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;
  return (
    <section className="py-20 md:py-24" ref={imageRef}>
      <div className="container">
        <motion.div
          animate={{ backgroundPositionX: starBg.width }}
          transition={{
            repeat: Infinity,
            duration: 120,
            ease: "linear",
          }}
          ref={borderedRef}
          className="border border-white/15 rounded-xl py-24 overflow-hidden relative group"
          style={{
            backgroundImage: `url(${starBg.src})`,
            backgroundPositionY,
          }}
        >
          <div
            className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"
            style={{
              backgroundImage: `url(${gridLined.src})`,
            }}
          ></div>
          <motion.div
            className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"
            style={{
              backgroundImage: `url(${gridLined.src})`,
              maskImage: maskImage,
            }}
          ></motion.div>
          <div className="relative">
            <h2 className="text-5xl text-center max-w-sm mx-auto md:text-6xl tracking-tighter font-medium">
              AI-driven SEO for everyone
            </h2>
            <p className="text-white/70 text-lg md:text-xl tracking-tight max-w-xs mx-auto text-center mt-5">
              Achieve clear, impactful results without the complexity
            </p>
            <div className="mt-8 flex justify-center">
              <Button>Join Waitlist</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

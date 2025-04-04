"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { Button } from "@/components/Button";
import starsBg from "@/assets/stars.png";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();
  // using the ref to reference the section for parallax scrolling
  const sectionRef = useRef(null);

  // useScroll hook to get the scroll progress of the target and to moniter from where to where, in this case moniter from start to end and end to start
  // then getting the scrollYProgress from the useScroll hook
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // whenever the scrollYProgress changes useMotionValueEvent will be triggered and some operation will be performed
  // useMotionValueEvent(scrollYProgress, "change", (value) => {
  //   console.log(value);
  // });

  // translating the decimals values ranging from o to 1 to -300 to 300 based on the scrollYProgress
  // making a backgroundPostionY variable to the scrollYProgress
  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );
  return (
    // whole Hero section style has star image getting repeated left and right
    <motion.section
      ref={sectionRef}
      // moving the background in X direction
      animate={{ backgroundPositionX: starsBg.width }}
      transition={{
        repeat: Infinity,
        duration: 120,
        ease: "linear",
      }}
      className="h-[492px] md:h-[680px] flex items-center relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      style={{ backgroundImage: `url(${starsBg.src})`, backgroundPositionY }}
      // simply adding the current background position using backgroundPositionY with the help of scrollProgressY
    >
      {/* purple background */}
      <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,.5)_15%,rgb(14,0,36,.5)_78%,transparent)]"></div>
      {/* planet with it's shadow */}
      <div className="absolute h-64 w-64 md:h-96 md:w-96 bg-purple-500 rounded-full border border-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(184,148,255)_37.7%,rgb(24,0,66))] shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-20px_-20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(140,69,255)]"></div>
      {/* inner most ring */}
      <motion.div
        // sort of preserving the styles implemented earlier
        style={{
          translateY: "-50%",
          translateX: "-50%",
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
        animate={{
          rotate: "1turn",
        }}
        className="absolute h-[344px] w-[344px] md:h-[580px] md:w-[580px] border border-white rounded-full top-1/2 left-1/2 opacity-20 -translate-x-1/2 -translate-y-1/2"
      >
        {/* left dot */}
        <div className="absolute h-2 w-2 top-1/2 -translate-y-1/2 -translate-x-1/2 left-0 rounded-full bg-white"></div>
        {/* upper dot */}
        <div className="absolute h-2 w-2 top-0 -translate-y-1/2 -translate-x-1/2 left-1/2 rounded-full bg-white"></div>
        {/* right dot */}
        <div className="absolute h-5 w-5 top-1/2 -translate-y-1/2 -translate-x-1/2 left-full rounded-full border border-white inline-flex items-center justify-center">
          {/* inner dot */}
          <div className="h-2 w-2 bg-white rounded-full"></div>
        </div>
      </motion.div>
      {/* second inner ring */}
      <motion.div
        style={{
          translateY: "-50%",
          translateX: "-50%",
        }}
        animate={{
          rotate: "-1turn",
        }}
        transition={{
          repeat: Infinity,
          duration: 90,
          ease: "linear",
        }}
        className="absolute h-[444px] opacity-20 w-[444px] md:h-[780px] md:w-[780px] border border-white rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"
      ></motion.div>
      {/* 3rd inner ring */}
      <motion.div
        style={{
          translateY: "-50%",
          translateX: "-50%",
        }}
        animate={{
          rotate: "1turn",
        }}
        transition={{
          repeat: Infinity,
          duration: 90,
          ease: "linear",
        }}
        className="absolute h-[544px] w-[544px] md:h-[980px] md:w-[980px] rounded-full border border-white opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {/* left dot */}
        <div className="absolute h-2 w-2 top-1/2 -translate-y-1/2 -translate-x-1/2 left-0 rounded-full bg-white"></div>
        {/* right dot */}
        <div className="absolute h-5 w-5 top-1/2 -translate-y-1/2 -translate-x-1/2 left-full rounded-full border bg-white"></div>
      </motion.div>
      {/* text container */}
      <div className="container relative mt-16">
        {/* gradient heading text */}
        <h1 className="text-8xl md:text-[168px] md:leading-none font-semibold tracking-tighter text-center bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,.5))] text-transparent bg-clip-text">
          MindCMS
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto text-white/70 mt-5 text-center">
        Revolutionize Content Creation with AI.
        Create, Optimize, and Publish High-Quality Content in Minutes
        </p>
        <div className="flex justify-center mt-5">
          <Button onClick={() => router.push("/dashboard")}>Get Started for Free</Button>
        </div>
      </div>
    </motion.section>
  );
};

"use client";
import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
} from "@dotlottie/react-player";
import productImage from "@/assets/product-image.png";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  ValueAnimationTransition,
} from "framer-motion";

const tabs = [
  {
    icon: "/assets/lottie/vroom.lottie",
    title: "User-friendly dashboard",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: "/assets/lottie/click.lottie",
    title: "One-click optimization",
    isNew: false,
    backgroundPositionX: 98,
    backgroundPositionY: 100,
    backgroundSizeX: 135,
  },
  {
    icon: "/assets/lottie/stars.lottie",
    title: "Smart keyword generator",
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 27,
    backgroundSizeX: 177,
  },
];

const FeatureTab = (tab: (typeof tabs)[number]) => {
  const [selectedTab, setSelectedTab] = useState(0);
  // using this ref to target the Lottie for animation
  const LottieRef = useRef<DotLottieCommonPlayer>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  // using this ref to measure the height and width of the div

  // playing the animation on mouse hover
  const handleMouseEnter = () => {
    if (LottieRef.current === null) return;
    // seek(0) to start the animation from the beginning
    LottieRef.current.seek(0);
    LottieRef.current.play();
  };

  const xPercentage = useMotionValue(0);
  const yPercentage = useMotionValue(0);

  // to use the percentage we need to convert this maskimage into a template literal

  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`;

  // this maskImage will change as the x and y percentages change, now in order to take this mask image the div needs to be a motion div

  // as soon as the component mounts we are gonna create the animation using useEffect animate function

  useEffect(() => {
    if (!tabRef.current) return;
    // getting the height and width of the div
    const { width, height } = tabRef.current.getBoundingClientRect();
    const circumference = height * 2 + width * 2;
    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 + height) / circumference,
      1,
    ];
    const option: ValueAnimationTransition = {
      times,
      duration: 4,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    };
    animate(xPercentage, [0, 100, 100, 0, 0], option);
    animate(yPercentage, [0, 0, 100, 100, 0], option);
    // the animation is a bit weird as the distance it is traveleing in y is less and distance it is travellig in x is more but the time duration is same for the both axis, to do this we are gonna measure the rectange and how much the circumfarence we need to cover  and we are gonna split it out and make our transition happen at right times

    // The xPercentage and yPercentage control the horizontal and vertical positions, respectively, while times dictate the keyframe timings for these animations to ensure they stay in sync
  }, [xPercentage, yPercentage]);

  return (
    <div
      ref={tabRef}
      onMouseEnter={handleMouseEnter}
      className="border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1 relative"
    >
      {/* [mask-image:radial-gradient(80px_80px_at_0%_0%,black,transparent)] we are going to animate these percentages to go from 0% 0% to 100% 100%  -> 0 0 being top left of dive and 100 100 being bottom right of div we will animate this using motion value and dynamically set the value mask-image value from it */}

      {/* <div className="absolute rounded-xl -m-px inset-0 border border-[#A369FF] [mask-image:radial-gradient(80px_80px_at_0%_0%,black,transparent)]"></div> */}

      <motion.div
        style={{
          maskImage,
        }}
        className="absolute rounded-xl -m-px inset-0 border border-[#A369FF]"
      ></motion.div>
      <div className="h-12 w-12 border border-white/15 rounded-lg inline-flex items-center justify-center">
        <DotLottiePlayer
          ref={LottieRef}
          src={tab.icon}
          className="h-5 w-5"
          autoplay
        />
      </div>
      <div className="font-medium text-sm">{tab.title}</div>
      {tab.isNew && (
        <div className="text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold">
          New
        </div>
      )}
    </div>
  );
};

export const Features = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
          Elevate your SEO efforts
        </h2>
        <p className="text-white/70 text-center md:text-xl mx-auto max-w-2xl text-lg tracking-tight mt-5">
          From small startups to large enterprises, our AI-driven toll has
          revolutonized the way businesses approach SEO.
        </p>
        <div className="mt-10 flex flex-col lg:flex-row gap-3">
          {tabs.map((tab) => (
            <FeatureTab {...tab} key={tab.title} />
          ))}
        </div>
        <div className="border border-white/20 p-2.5 rounded-xl mt-3">
          <div
            className="aspect-video bg-cover border border-white/20 rounded-lg"
            style={{ backgroundImage: `url(${productImage.src})` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

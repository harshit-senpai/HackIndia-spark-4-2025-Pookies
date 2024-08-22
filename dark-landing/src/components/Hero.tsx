import Link from "next/link";

import ArrowWIcon from "../assets/icons/arrow-w.svg";
import CursorImage from "../assets/images/cursor.png";
import messageImage from "../assets/images/message.png";
import Image from "next/image";

export const Hero = () => {
  return (
    // bg grident = linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)
    <div className="text-white bg-black py-[72px] sm:py-24 bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] relative overflow-clip">
      {/* lower radial gradient */}
      <div className="absolute h-[375px] w-[758px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] lg:h-[1200px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border border-[#B4BCDE] bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[calc(100%-260px)]"></div>
      <div className="container relative">
        {/* Badge */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex gap-3 border py-1 px-2 rounded-lg border-white/30"
          >
            <span className="bg-[linear-gradient(to_right,#F87AFF,#FB93D0,#FFDD99,#C3F0B2)] text-transparent bg-clip-text [-webkit-background-clip:text] ">
              Version 2.0 is here
            </span>
            <span className="inline-flex items-center gap-1">
              <span>Read More</span>
              <ArrowWIcon />
            </span>
          </Link>
        </div>
        {/* text content */}
        <div className="flex justify-center mt-8 ">
          <div className="inline-flex relative">
            <h1 className="text-7xl sm:text-9xl font-bold tracking-tighter text-center inline-flex">
              One task <br /> at a Time
            </h1>
            <Image
              src={CursorImage}
              height="200"
              width="200"
              className="absolute right-[476px] top-[108px] sm:inline hidden"
              alt=""
            />
            <Image
              src={messageImage}
              height="200"
              width="200"
              className="absolute top-[56px] left-[498px] sm:inline hidden"
              alt=""
            />
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-center txt-xl mt-8 max-w-md">
            Celebrate the joy of accomplishment with an app designed to track
            progress, motivate your efforts, and celebrate your successes.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <button className="bg-white text-black py-3 px-5 rounded-lg font-medium">
            Get for free
          </button>
        </div>
      </div>
    </div>
  );
};

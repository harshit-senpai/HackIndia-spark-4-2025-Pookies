import Link from "next/link";
import ArrowWIcon from "../assets/icons/arrow-w.svg";

export const Hero = () => {
  return (
    // bg grident = linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)
    <div className="text-white bg-black py-[72px] bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] relative">
      <div className="container">
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
        <h1 className="text-7xl font-bold tracking-tighter text-center mt-8">
          One task at a Time
        </h1>
        <p className="text-center txt-xl mt-8">
          Celebrate the joy of accomplishment with an app designed to track
          progress, motivate your efforts, and celebrate your successes.
        </p>
        <div className="flex justify-center mt-8">
          <button className="bg-white text-black py-3 px-5 rounded-lg font-medium">
            Get for free
          </button>
        </div>
      </div>
    </div>
  );
};

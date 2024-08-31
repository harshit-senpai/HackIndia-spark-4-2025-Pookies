import helixImage from "../assets/images/helix2.png";
import emojiStar from "../assets/images/emojistar.png";
import Image from "next/image";

export const CallToAction = () => {
  return (
    <div className="bg-black text-white text-center py-[72px] sm:py-40  overflow-hidden">
      <div className="container max-w-xl relative">
        <Image
          src={helixImage}
          className="absolute top-6 left-[calc(100%+24px)]"
          alt="Helix"
        />
        <Image
          src={emojiStar}
          className="absolute -top-[120px] right-[calc(100%+24px)]"
          alt="Emoji Star"
        />
        <h2 className="font-bold text-5xl sm:text-6xl tracking-tighter">
          Get Instant Access
        </h2>
        <p className="text-xl text-white/70 mt-5">
          Celebrate the joy of accomplishments with an app designed to track
          your progress and motivate you to keep going.
        </p>
        <form className="mt-10 flex flex-col gap-2.5 max-w-sm mx-auto sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="py-2 sm:h-12 bg-white/20 rounded-lg px-5 font-medium placeholder:text-[#9CA3AF] flex-1"
          />
          <button className="bg-white text-black h-10 sm:h-12 rounded-lg px-5">
            Get Access
          </button>
        </form>
      </div>
    </div>
  );
};

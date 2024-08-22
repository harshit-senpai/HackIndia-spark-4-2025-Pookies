import Image from "next/image";
import appScreen from "../assets/images/app-screen.png";

export const ProductShowcase = () => {
  return (
    <div className="bg-black text-white bg-gradient-to-b from-black to-[#5D2CAB] py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center font-bold tracking-tighter text-5xl sm:text-6xl">
          Intuitive interface
        </h2>
        <div className=" max-w-xl mx-auto">
          <p className="text-center text-xl text-white/70 mt-5">
            Celebrate the joy of accomplishments with an app designed to track
            your progress, motivate your efforts, and celebrate your showcase,
            one task at a time
          </p>
        </div>
        <div className="flex justify-center">
        <Image src={appScreen} alt="The product" className="mt-14 " />
        </div>
      </div>
    </div>
  );
};

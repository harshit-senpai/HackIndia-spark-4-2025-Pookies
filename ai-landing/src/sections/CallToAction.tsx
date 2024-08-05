import { Button } from "@/components/Button";
import starBg from "@/assets/stars.png";
import gridLined from "@/assets/grid-lines.png";

export const CallToAction = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div
          className="border border-white/15 rounded-xl py-24 overflow-hidden relative"
          style={{
            backgroundImage: `url(${starBg.src})`,
          }}
        >
          <div
            className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)]"
            style={{
              backgroundImage: `url(${gridLined.src})`,
            }}
          ></div>
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
        </div>
      </div>
    </section>
  );
};

import Image from "next/image";
import logoImage from "../assets/images/logosaas.png";
import MenuIcon from "../assets/icons/menu.svg";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="bg-black">
      <div className="px-4">
        <div className="py-4 flex items-center justify-between">
          <div className="relative">
            <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] blur-md"></div>
            <Image src={logoImage} alt="logo" className="relative h-12 w-12" />
          </div>
          <div className="border border-white border-opacity-30 h-10 w-10  inline-flex items-center justify-center rounded-lg sm:hidden">
            <MenuIcon className="text-white" />
          </div>
          <nav className="sm:flex gap-6 items-center hidden">
            <Link
              href="/"
              className="text-white text-opacity-60 hover:text-opacity-100 transition"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-white text-opacity-60 hover:text-opacity-100 transition"
            >
              Features
            </Link>
            <Link
              href="/"
              className="text-white text-opacity-60 hover:text-opacity-100 transition"
            >
              Updates
            </Link>
            <Link
              href="/"
              className="text-white text-opacity-60 hover:text-opacity-100 transition"
            >
              Help
            </Link>
            <Link
              href="/"
              className="text-white text-opacity-60 hover:text-opacity-100 transition"
            >
              Customers
            </Link>
            <button className="bg-white rounded-lg py-2 px-4">
              Get for free
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

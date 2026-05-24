import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function Humberger() {
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <button
        onClick={handleMenuOpen}
        type="button"
        className="z-10 space-y-2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full shadow-lg hover:shadow-xl transition border-2 border-blue-400 border-opacity-50 fixed top-4 right-4"
      >
        <div
          className={
            openMenu
              ? "w-6 h-0.5 bg-white translate-y-1.5 rotate-45 transition duration-500 ease-in-out"
              : "w-6 h-0.5 bg-white transition duration-500 ease-in-out"
          }
        />
        <div
          className={
            openMenu
              ? "opacity-0 transition duration-500 ease-in-out"
              : "w-6 h-0.5 bg-white transition duration-500 ease-in-out"
          }
        />
        <div
          className={
            openMenu
              ? "w-6 h-0.5 bg-white -rotate-45 transition duration-500 ease-in-out"
              : "w-6 h-0.5 bg-white transition duration-500 ease-in-out"
          }
        />
      </button>
      <nav
        className={
          openMenu
            ? "text-left fixed bg-slate-900 bg-opacity-95 backdrop-blur-xl right-0 top-0 w-80 h-screen flex flex-col justify-start pt-20 px-6 rounded-l-2xl shadow-2xl border-l-2 border-blue-500 border-opacity-30"
            : "fixed right-[-100%]"
        }
      >
        <ul className="mt-6 space-y-4">
          <li className="border-b border-blue-500 border-opacity-30 pb-2">
            <Link
              to="/"
              className="py-3 inline-block text-blue-300 hover:text-cyan-400 font-medium transition-all hover:translate-x-2"
            >
              回答形式
            </Link>
          </li>
          <li className="border-b border-blue-500 border-opacity-30 pb-2">
            <Link
              to="/four-choice"
              className="py-3 inline-block text-blue-300 hover:text-cyan-400 font-medium transition-all hover:translate-x-2"
            >
              4択形式
            </Link>
          </li>
          <li className="border-b border-blue-500 border-opacity-30 pb-2">
            <Link
              to="/about"
              className="py-3 inline-block text-blue-300 hover:text-cyan-400 font-medium transition-all hover:translate-x-2"
            >
              ABOUT
            </Link>
          </li>
          <li className="border-b border-blue-500 border-opacity-30 pb-2">
            <Link
              to="/config"
              className="py-3 inline-block text-blue-300 hover:text-cyan-400 font-medium transition-all hover:translate-x-2"
            >
              CONFIG
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

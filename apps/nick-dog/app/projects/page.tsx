import Link from "next/link";
import React from "react";
// import Particles from "./components/particles";

const projects = [
  {
    name: "BlackJack",
    href: "/projects/blackjack",
    description: "A simple blackjack game",
    github: "",
  },
  {
    name: "Word Finder",
    href: "/word-finder",
    description: "A simple blackjack game",
    github: "",
  },
  {
    name: "Xordle",
    href: "/xordle",
    description: "A customizable word search game inspired by Wordle",
    github: "",
  },
];

export default function ProjectsIndex() {
  return (
    // <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden ">
    <div className="flex flex-col items-center justify-center w-scree h-screen">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {projects.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      <div></div>

      <h1 className="title-text animate-title text-6xl sm:text-8xl md:text-10xl">
        PROJECTS
      </h1>

      <div className="w-screen h-px animate-glow md:block animate-fade-right " />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          Hi, my name is Nick, I build beautiful websites and applications
          <br />
          {/* <Link
            target="_blank"
            href="https://upstash.com"
            className="underline duration-500 hover:text-zinc-300"
          >
            Upstash
          </Link>
          <br />
          and working on{" "}
          <Link
            target="_blank"
            href="https://planetfall.io"
            className="underline duration-500 hover:text-zinc-300"
          >
            planetfall.io
          </Link>{" "}
          at night.*/}
        </h2>
      </div>
    </div>
  );
}

"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import { SparklesIcon } from "@heroicons/react/24/solid";

export default function About() {
  return (
    <>
      <NavBar />

      <div className="relative isolate px-6 py-16 lg:px-2">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl py-14 ">
          <div className="text-center">
            <SparklesIcon className="size-24 m-auto text-yellow-500" />

            <p className="mt-8 text-lg font-normal italic text-gray-400 sm:text-lg/8">
              Esta página foi desenvolvida como um projeto pessoal, com o
              objetivo de aprimorar meus conhecimentos e colocar em prática
              habilidades técnicas. Caso tenha interesse em conhecer mais sobre
              o meu trabalho ou meus projetos, fique à vontade para entrar em
              contato.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="https://github.com/Guuzta"
                target="_blank"
                className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:text-black  hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/gustavobodziak/"
                target="_blank"
                className="rounded-md bg-[#0077B5] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#00a8ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

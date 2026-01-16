"use client";

import Image from "next/image";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";

export default function Products() {
  return (
    <>
      <NavBar />
      <div className="py-16 flex w-full justify-center items-center">
        <div className="flex relative w-full px-4 max-w-xl md:max-w-4xl">
          <input
            type="text"
            name="q"
            id="query"
            placeholder="Pesquise por um produto do seu interesse..."
            className="block w-full rounded-tl-md rounded-bl-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 placeholder:italic"
          />
          <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-md font-semibold py-3 px-6 rounded-r-md">
            <span>Pesquisar</span>
            <span className="hidden md:block">
              <MagnifyingGlassIcon className="size-6 text-white" />
            </span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl m-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-x-4 gap-y-12 justify-start px-12 pb-12 ">
        <div className="border-2 border-gray-300/10 max-w-xs mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
          <div className="relative">
            <Image
              className="w-full"
              width={500}
              height={500}
              src="/notebook.png"
              alt="Product Image"
            />
            <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
              DISPONÍVEL
            </div>
          </div>
          <div className="p-4  bg-gray-800/50">
            <h3 className="text-lg font-medium mb-2 text-indigo-500">
              Notebook Gamer Acer Nitro V ANV15-51-57WS
            </h3>
            <p className="text-gray-600 text-sm mb-4 text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              vitae ante vel eros fermentum faucibus sit amet euismod lorem.
            </p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg text-white">R$ 4.399</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Comprar agora
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

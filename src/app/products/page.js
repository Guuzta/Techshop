"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

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
        <ProductCard
          isAvailable={true}
          name="Notebook Gamer Acer Nitro V ANV15-51-57WS"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae
          ante vel eros fermentum faucibus sit amet euismod lorem."
          price="R$ 4.399"
        />
      </main>

      <Footer />
    </>
  );
}

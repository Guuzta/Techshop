"use client";

import { useEffect, useState } from "react";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ErrorToast from "@/components/ErrorToast";
import Loader from "@/components/Loader";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data = await res.json();
        setProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        handleShowToast();
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

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
        {products.map((product) => (
          <ProductCard
            key={product.id}
            isAvailable={product.stock}
            name={product.name}
            description={product.description}
            price={`R$${product.price}`}
            imageUrl={product.imageUrl}
          />
        ))}

        <ErrorToast showToast={showToast} />
      </main>

      <Footer />
    </>
  );
}

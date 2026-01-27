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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&limit=10&name=${search}`,
        );
        const data = await res.json();

        setProducts(data.products);
        setTotalPages(data.meta.totalPages);
        setIsLoading(false);
      } catch (error) {
        handleShowToast();
        console.log(error);
      }
    };

    fetchData();
  }, [page, search]);

  return (
    <>
      <NavBar />
      <div className="py-16 flex w-full justify-center items-center">
        <div className="flex relative w-full px-4 max-w-xl md:max-w-4xl">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            name="q"
            value={inputValue}
            id="query"
            placeholder="Pesquise por um produto do seu interesse..."
            className="block w-full rounded-tl-md rounded-bl-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 placeholder:italic"
          />
          <button
            onClick={() => handleSearch(inputValue)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-md font-semibold py-3 px-6 rounded-r-md"
          >
            <span>Pesquisar</span>
            <span className="hidden md:block">
              <MagnifyingGlassIcon className="size-6 text-white" />
            </span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div>
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
          </main>

          <nav className="mb-8 mx-auto w-fit flex items-center p-1 rounded bg-gray-800/50 space-x-2">
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1 || isLoading}
              className="p-1 rounded  text-white bg-gray-800/50 hover:text-white hover:bg-indigo-600 hover:border-indigo-600"
              href="#"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </button>
            <p className="text-gray-500">{`Página ${page} de ${totalPages}`}</p>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages || isLoading}
              className="p-1 rounded text-white bg-gray-800/50 hover:text-white hover:bg-indigo-600 hover:border-indigo-600"
              href="#"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </nav>
        </div>
      )}

      <ErrorToast showToast={showToast} />

      <Footer />
    </>
  );
}

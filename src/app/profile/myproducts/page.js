"use client";

import { useState, useEffect } from "react";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import SuccessModal from "@/components/SuccessModal";

export default function Profile() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();

        setProducts(data.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        handleShowToast();
        console.log(error);
      }
    };

    fetchData();
  }, [currentProduct]);

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem("accessToken");

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentProduct(productId);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />

      {isLoading ? (
        <Loader />
      ) : products?.length > 0 ? (
        <div>
          <div className="text-center mt-20">
            <h1 className="mb-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              Meus produtos
            </h1>
            <h2 className="text-white">
              Aqui você pode visualizar, atualizar ou remover seus produtos
              cadastrados
            </h2>
          </div>

          <main className="max-w-7xl m-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-x-4 gap-y-12 justify-start p-12 pb-12 ">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                isAvailable={product.stock}
                name={product.name}
                description={product.description}
                price={`R$${product.price}`}
                imageUrl={product.imageUrl}
                updateButton={true}
                deleteProduct={() => deleteProduct(product.id)}
              />
            ))}
          </main>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className=" mx-auto text-center bg-opacity-90 p-8 ">
            <div className="text-9xl font-bold text-indigo-600 mb-8">:/</div>
            <h1 className="text-4xl font-bold text-white mb-8">
              Oops! Parece que você não possui nenhum produto ainda
            </h1>
            <a
              href="/publish"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Adicionar produto
            </a>
          </div>
        </div>
      )}

      {isOpen && (
        <SuccessModal
          closeModal={() => setIsOpen(false)}
          title="Produto deletado com sucesso!"
          message=""
          showConfirmButton={true}
          showDenyButton={false}
        />
      )}

      <Footer />
    </>
  );
}

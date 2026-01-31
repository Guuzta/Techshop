"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

import {
  PencilSquareIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ErrorToast from "@/components/ErrorToast";

export default function Settings() {
  const [payload, setPayload] = useState("");
  const [userSince, setUserSince] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const payload = jwtDecode(token);

    setTimeout(() => {
      setPayload(payload);

      const date = new Date(payload.createdAt);
      const userSince = date.toLocaleDateString("pt-br");
      setUserSince(userSince);
    }, 0);

    const fecthData = async () => {
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
        const products = data.products.length;
        setTotalProducts(products);

        setIsLoading(false);
      } catch (error) {
        handleShowToast();
        console.log(error);
      }
    };

    fecthData();
  }, []);

  return (
    <>
      <NavBar />

      {isLoading ? (
        <Loader />
      ) : (
        <section className="my-20 mx-12 h-screen">
          <div className="py-4 border border-gray-300/10 bg-gray-800/50 scheme-dark">
            <h1 className="text-center font-medium text-gray-400 text-2xl sm:text-xl lg:text-2xl ">
              {`Seja bem-vindo ${payload.name}`}
            </h1>
            <p className="text-center italic text-indigo-500">
              {`Usuário desde ${userSince}`}
            </p>
          </div>

          <div className="flex ">
            <div className="w-1/2 py-4 border border-gray-300/10 bg-gray-800/50 scheme-dark">
              <h1 className="text-4xl text-center font-medium text-gray-400 sm:text-6xl lg:text-6xl ">
                {totalProducts}
              </h1>
              <h1 className="text-xl lg:text-2xl text-center italic text-green-400">{`Produtos cadastrados`}</h1>
            </div>

            <div className="w-1/2 py-4 border border-gray-300/10 bg-gray-800/50 scheme-dark">
              <h1 className="text-4xl text-center font-medium text-gray-400 sm:text-6xl lg:text-6xl ">
                {"0"}
              </h1>
              <h1 className="text-xl lg:text-2xl text-center italic text-red-400">{`Produtos deletados`}</h1>
            </div>
          </div>

          <div className="flex ">
            <div className="text-center w-1/2 py-4 border border-gray-300/10 bg-gray-800/50 scheme-dark">
              <PencilSquareIcon className="mb-4 size-9 m-auto text-yellow-500" />
              <Link
                href="/profile/settings/update"
                className="rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
              >
                Editar perfil
              </Link>
            </div>

            <div className="text-center w-1/2 py-4 border border-gray-300/10 bg-gray-800/50 scheme-dark">
              <ArrowRightStartOnRectangleIcon className="mb-4 size-9 m-auto text-red-500" />
              <Link
                href="#"
                className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                Sair
              </Link>
            </div>
          </div>
        </section>
      )}

      <ErrorToast showToast={showToast} />

      <Footer />
    </>
  );
}

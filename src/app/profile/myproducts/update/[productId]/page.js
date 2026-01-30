"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { useFormik } from "formik";
import productSchema from "./productSchema";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SuccessModal from "@/components/SuccessModal";
import ErrorToast from "@/components/ErrorToast";
import Loader from "@/components/Loader";
import { parse } from "postcss";

export default function Update() {
  const [product, setProduct] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const { productId } = params;

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
          `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        setProduct(data.product);
        setIsLoading(false);
      } catch (error) {
        handleShowToast();
        console.log(error);
      }
    };

    fetchData();
  }, [productId]);

  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      stock: product?.stock || "",
    },
    enableReinitialize: true,
    validationSchema: productSchema,
    onSubmit: async (values) => {
      const token = localStorage.getItem("accessToken");

      const { name, description, price, stock } = values;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name,
              description,
              price: parseFloat(price),
              stock: parseInt(stock),
            }),
          },
        );

        if (res.ok) {
          setIsOpen(true);
          formik.resetForm({
            values: {
              name,
              description,
              price,
              stock,
            },
          });
        }
      } catch (error) {
        handleShowToast();
        console.log(error);
      }
    },
  });

  return (
    <>
      <NavBar />
      <div className="text-center mt-20">
        <h1 className="mb-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Atualizar produto
        </h1>
        <h2 className="text-white">Modifique os campos que achar necessário</h2>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <main className="mx-8 my-20 max-w-sm px-4 py-8 border border-gray-300/10 bg-gray-800/50 scheme-dark mx-auto  sm:px-6 lg:max-w-4xl lg:px-8 lg:mx-auto">
          <form onSubmit={formik.handleSubmit} action="#" method="POST">
            <div className="space-y-12">
              <div className="border-b border-white/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="name"
                      className="block text-sm/6 font-medium text-white"
                    >
                      Nome do Produto
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="name"
                        autoComplete="given-name"
                        className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 
                      ${formik.touched.name && formik.errors.name && "border border-red-500 focus:border-0"}`}
                      />

                      {formik.touched.name && formik.errors.name && (
                        <span className="block italic mt-2 text-sm text-red-500">
                          {formik.errors.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm/6 font-medium text-white"
                    >
                      Descrição
                    </label>
                    <div className="mt-2">
                      <p className="mt-3 text-sm/6 text-gray-400 italic">
                        Escreva uma pequena descrição sobre o produto
                      </p>
                      <textarea
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows="3"
                        className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 
                      ${formik.touched.description && formik.errors.description && "border border-red-500 focus:border-0"}`}
                      ></textarea>

                      {formik.touched.description &&
                        formik.errors.description && (
                          <span className="block italic mt-2 text-sm text-red-500">
                            {formik.errors.description}
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-sm/6 font-medium text-white"
                    >
                      Preço
                    </label>
                    <div className="mt-2">
                      <input
                        id="price"
                        type="text"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="price"
                        autoComplete="given-name"
                        className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 ${formik.touched.price && formik.errors.price && "border border-red-500 focus:border-0"}`}
                      />

                      {formik.touched.price && formik.errors.price && (
                        <span className="block italic mt-2 text-sm text-red-500">
                          {formik.errors.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="stock"
                      className="block text-sm/6 font-medium text-white"
                    >
                      Estoque
                    </label>
                    <div className="mt-2">
                      <input
                        id="stock"
                        type="text"
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="stock"
                        autoComplete="given-name"
                        className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 ${formik.touched.stock && formik.errors.stock && "border border-red-500 focus:border-0"}`}
                      />

                      {formik.touched.stock && formik.errors.stock && (
                        <span className="block italic mt-2 text-sm text-red-500">
                          {formik.errors.stock}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className={`rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 
              ${formik.isSubmitting ? "opacity-50 bg-gray-500" : ""}`}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Atualizando produto..." : "Atualizar"}
              </button>
            </div>

            {isOpen && (
              <SuccessModal
                closeModal={() => setIsOpen(false)}
                title="Produto atualizado com sucesso!"
                showConfirmButton={true}
                showDenyButton={false}
              />
            )}
          </form>
        </main>
      )}

      <ErrorToast showToast={showToast} />

      <Footer />
    </>
  );
}

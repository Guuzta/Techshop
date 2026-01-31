"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { useFormik } from "formik";
import productSchema from "./productSchema";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SuccessModal from "@/components/SuccessModal";
import ErrorToast from "@/components/ErrorToast";
import Loader from "@/components/Loader";

export default function Update() {
  const [payload, setPayload] = useState({});
  const [isOpen, setIsOpen] = useState(false);
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
      setIsLoading(false);
    }, 0);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: payload?.name || "",
      email: payload?.email || "",
    },
    enableReinitialize: true,
    validationSchema: productSchema,
    onSubmit: async (values) => {
      const token = localStorage.getItem("accessToken");

      const { name, email } = values;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            email,
          }),
        });

        if (res.ok) {
          setIsOpen(true);
          formik.resetForm({
            values: {
              name,
              email,
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
          Atualizar dados do usuário
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
                      Usuário
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
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="name"
                      className="block text-sm/6 font-medium text-white"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="email"
                        autoComplete="given-email"
                        className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 
                      ${formik.touched.email && formik.errors.email && "border border-red-500 focus:border-0"}`}
                      />

                      {formik.touched.email && formik.errors.email && (
                        <span className="block italic mt-2 text-sm text-red-500">
                          {formik.errors.email}
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
                {formik.isSubmitting
                  ? "Atualizando dados do usuário..."
                  : "Atualizar"}
              </button>
            </div>

            {isOpen && (
              <SuccessModal
                closeModal={() => setIsOpen(false)}
                title="Dados do usuário atualizado com sucesso!"
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

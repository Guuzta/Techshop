"use client";

import { useState } from "react";
import { useVerifyToken } from "@/hooks/verifyToken";

import { useFormik } from "formik";
import passwordSchema from "./passwordSchema";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SuccessModal from "@/components/SuccessModal";
import ErrorToast from "@/components/ErrorToast";
import Loader from "@/components/Loader";

export default function Update() {
  const authenticated = useVerifyToken();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    enableReinitialize: true,
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      const token = localStorage.getItem("accessToken");

      const { currentPassword, newPassword } = values;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me/password`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              currentPassword,
              newPassword,
            }),
          },
        );

        if (res.ok) {
          setIsOpen(true);
          formik.resetForm();

          return;
        }

        const data = await res.json();
        setErrorMessage(data.errors[0]);

        handleShowToast();
      } catch (error) {
        console.log("teste");
        handleShowToast();
        console.log(error);
      }
    },
  });

  if (!authenticated) {
    return <Loader />;
  }

  return (
    <>
      <NavBar />
      <div className="text-center mt-20">
        <h1 className="mb-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Atualizar senha do usuário
        </h1>
      </div>

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
                    Senha atual
                  </label>
                  <div className="mt-2">
                    <input
                      id="currentPassword"
                      type="password"
                      value={formik.values.currentPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="currentPassword"
                      autoComplete="given-currentPassword"
                      className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 
                      ${formik.touched.currentPassword && formik.errors.currentPassword && "border border-red-500 focus:border-0"}`}
                    />

                    {formik.touched.currentPassword &&
                      formik.errors.currentPassword && (
                        <span className="block italic mt-2 text-sm text-red-500">
                          {formik.errors.currentPassword}
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
                    Nova senha
                  </label>
                  <div className="mt-2">
                    <input
                      id="newPassword"
                      type="password"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="newPassword"
                      autoComplete="given-newPassword"
                      className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 
                      ${formik.touched.newPassword && formik.errors.newPassword && "border border-red-500 focus:border-0"}`}
                    />

                    {formik.touched.newPassword &&
                      formik.errors.newPassword && (
                        <span className="block italic mt-2 text-sm text-red-500">
                          {formik.errors.newPassword}
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
                ? "Atualizando senha do usuário..."
                : "Atualizar"}
            </button>
          </div>

          {isOpen && (
            <SuccessModal
              closeModal={() => setIsOpen(false)}
              title="Sua senha foi atualizada com sucesso!"
              showConfirmButton={true}
              showDenyButton={false}
            />
          )}
        </form>
      </main>

      <ErrorToast showToast={showToast} errorMessage={errorMessage} />

      <Footer />
    </>
  );
}

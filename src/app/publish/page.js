"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Publish() {
  return (
    <>
      <NavBar />
      <div className="text-center mt-20">
        <h1 className="mb-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Publicar produto
        </h1>
        <h2 className="text-white">Adicione um produto ao seu catálogo</h2>
      </div>

      <main className="mx-8 my-20 max-w-2x1 px-4 py-8 border border-gray-300/10 bg-gray-800/50 scheme-dark mx-auto  sm:px-6 lg:max-w-4xl lg:px-8 lg:mx-auto">
        <form>
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
                      name="name"
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
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
                      rows="3"
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    ></textarea>
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
                      name="price"
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
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
                      name="stock"
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="image"
                    className="block text-sm/6 font-medium text-white"
                  >
                    Foto
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                    <div className="text-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        data-slot="icon"
                        aria-hidden="true"
                        className="mx-auto size-12 text-gray-600"
                      >
                        <path
                          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                      <div className="mt-4 flex text-sm/6 text-gray-400">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                        >
                          <span>Adicione um arquivo</span>
                          <input
                            id="file-upload"
                            type="file"
                            name="file-upload"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">ou arraste e solte</p>
                      </div>
                      <p className="text-xs/5 text-gray-400">
                        PNG ou JPG no máximo 5MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Cadastrar produto
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}

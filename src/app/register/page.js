"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { UserPlusIcon } from "@heroicons/react/24/solid";

import Input from "../components/Input";
import SuccessModal from "../components/SuccessModal";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = [];

    setLoading(true);
    setError([]);
    setSuccess("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();
      const { success } = data;

      if (!success) {
        const { errors } = data;

        errors.forEach((error) => {
          newErrors.push(error);
        });

        return setError(newErrors);
      }

      setIsOpen(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      newErrors.push(error.message);
      setError(newErrors);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="flex h-screen min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
      <main className="">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <UserPlusIcon className="size-24 m-auto text-indigo-500" />
          <h2 className="text-4xl mt-8 text-center font-bold tracking-tight text-white">
            Crie sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            action="#"
            method="POST"
            className="space-y-6"
          >
            <Input
              type="text"
              name="name"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              <button
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {loading ? "Enviando..." : "Cadastrar"}
              </button>
            </div>

            <ul className="list-disc list-inside">
              {error &&
                error.map((err, index) => (
                  <li key={index} className="text-red-500">
                    {err}
                  </li>
                ))}
            </ul>

            {success && (
              <p className="mb-4 text-green-500 text-center">{success}</p>
            )}
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Já possui uma conta?
            <Link
              href="/login"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Faça Login
            </Link>
          </p>
        </div>
      </main>

      {isOpen && (
        <SuccessModal
          closeModal={() => setIsOpen(false)}
          title="Cadastro realizado com sucesso!"
          message="Seu cadastro foi efetuado com sucesso! Você já pode fazer
          login e começar a usar todos os recursos disponíveis."
          handleRedirect={handleRedirect}
          showConfirmButton={true}
          showDenyButton={true}
        />
      )}
    </div>
  );
}

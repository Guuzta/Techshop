"use client";

import NavBar from "@/components/NavBar";

import { useVerifyToken } from "./hooks/verifyToken";

export default function Home() {
  const authenticated = useVerifyToken();

  if (!authenticated)
    return <div className="mt-5 text-white text-center">Carregando...</div>;

  return (
    <>
      <NavBar />
    </>
  );
}

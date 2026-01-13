"use client";

import { useVerifyToken } from "./hooks/verifyToken";

export default function Home() {
  const authenticated = useVerifyToken();

  if (!authenticated)
    return <div className="mt-5 text-white text-center">Carregando...</div>;

  return (
    <div className="bg-green-500 text-white p-10 text-center">
      Seja bem-vindo
    </div>
  );
}

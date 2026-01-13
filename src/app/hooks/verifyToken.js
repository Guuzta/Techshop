import { useEffect, useState } from "react";
import { isTokenValid } from "@/utils/token";
import { useRouter } from "next/navigation";

export function useVerifyToken() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!isTokenValid(token)) {
      localStorage.removeItem("accessToken");
      return router.push("/login");
    }

    setTimeout(() => {
      setAuthenticated(true);
    }, 0);
  }, [router]);

  return authenticated;
}

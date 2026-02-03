import { useEffect, useState } from "react";
import { isTokenValid } from "@/utils/token";
import { useRouter } from "next/navigation";

export function useVerifyToken() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchData = async () => {
      const isValid = await isTokenValid(token);

      if (!isValid) {
        localStorage.removeItem("accessToken");
        return router.push("/login");
      }

      setTimeout(() => {
        setAuthenticated(true);
      }, 0);
    };

    fetchData();
  }, [router]);

  return authenticated;
}

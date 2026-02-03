import { jwtDecode } from "jwt-decode";

export async function isTokenValid(token) {
  if (!token) return false;

  const payload = jwtDecode(token);
  const now = Date.now() / 1000;

  const isValid = payload.exp > now;

  if (!isValid) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!res.ok) {
        return false;
      }

      const data = await res.json();
      const accessToken = data.accessToken;

      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", accessToken);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return isValid;
}

import { jwtDecode } from "jwt-decode";

export function isTokenValid(token) {
  if (!token) return false;

  try {
    const payload = jwtDecode(token);
    const now = Date.now() / 1000;
    return payload.exp > now;
  } catch (error) {
    return false;
  }
}

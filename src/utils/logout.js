"use client";

export async function logout() {
  const token = localStorage.getItem("accessToken");

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("accessToken");
  } catch (_) {
    return null;
  }
}

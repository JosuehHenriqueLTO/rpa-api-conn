"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: any) {
  const response = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    return { error: data.detail || "Authentication failed!" };
  }

  const cookieStore = await cookies();
  cookieStore.set("auth_token", data.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  //   cookieStore.set("user_name", data.user.name, { httpOnly: false });

  redirect("/");
}

export async function getProducts() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  // Se não houver token, você pode redirecionar ou retornar erro
  if (!token) {
    return { error: "Unauthenticated" };
  }

  try {
    const response = await fetch("http://localhost:8000/api/products/export/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Padrão JWT que o Django espera
      },
      next: { revalidate: 60 }, // Opcional: faz cache por 60 segundos
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.detail || "Erro ao buscar produtos" };
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na busca de produtos:", error);
    return { error: "Erro de conexão com o servidor" };
  }
}

export async function registerProduct(formData: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return { error: "Não autenticado" };

  try {
    const response = await fetch("http://localhost:8000/api/products/bulk/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify([formData]),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.detail || "Erro de validação no cadastro." };
    }

    return { success: true, message: data.message };
  } catch (error) {
    return { error: "Falha na conexão." };
  }
}

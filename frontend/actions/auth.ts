"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Use 'backend' (service name in docker-compose) for server-to-server communication
const BASE_URL = process.env.BACKEND_URL || "http://backend:8000";

export async function loginAction(formData: any) {
  const response = await fetch(`${BASE_URL}/api/login/`, {
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

  redirect("/");
}

export async function getProducts() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return { error: "Unauthenticated" };

  try {
    const response = await fetch(`${BASE_URL}/api/products/export/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
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
    const response = await fetch(`${BASE_URL}/api/products/bulk/`, {
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

    // Revalidate the path so the list updates after registration
    revalidatePath("/");
    return { success: true, message: data.message };
  } catch (error) {
    return { error: "Falha na conexão." };
  }
}

export async function deleteProduct(id: string | number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return { error: "Não autenticado" };

  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}/delete/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { error: "Erro ao deletar o produto no servidor." };
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Falha na conexão com o backend." };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  redirect("/login");
}
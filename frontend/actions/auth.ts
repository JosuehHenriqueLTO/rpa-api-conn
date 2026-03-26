"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.BACKEND_URL || "http://backend:8000";
// const BASE_URL = process.env.BACKEND_URL || "http://localhost:8000";

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

export async function getUserInfo() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return { error: "No token found" };

  try {
    const response = await fetch(`${BASE_URL}/api/users/user/info/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) return { error: "Failed to fetch user" };

    return await response.json();
  } catch (e) {
    return { error: "Connection error" };
  }
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
      return { error: errorData.detail || "Error" };
    }

    return await response.json();
  } catch (error) {
    console.error("Cannot search products:", error);
    return { error: "Cannot contact server" };
  }
}

export async function registerProduct(formData: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return { error: "Unauthenticated" };

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
      return { error: data.detail || "Unvalidated." };
    }

    revalidatePath("/");
    return { success: true, message: data.message };
  } catch (error) {
    return { error: "Unconnected" };
  }
}

export async function deleteProduct(id: string | number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return { error: "Unauthenticated" };

  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}/delete/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { error: "Cannot delete product." };
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Cannot connect backend" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  redirect("/login");
}

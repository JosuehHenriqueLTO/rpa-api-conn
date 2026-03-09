"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerProduct } from "@/actions/auth";

const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  product_type: z.string().min(1, "Type is necessary"),
  description: z.string().optional(),
  monthly_sales: z.coerce.number().min(0, "Sales cannot be negative"),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductRegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      product_type: "",
      description: "",
      monthly_sales: 0,
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    setLoading(true);
    setError(null);

    const result = await registerProduct(values);

    if (result?.error) {
      setError(result.error);
    } else {
      form.reset();
      alert("Product registered!");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input placeholder="Product name" {...form.register("name")} />
        <Input placeholder="Type" {...form.register("product_type")} />
        <Input placeholder="Description" {...form.register("description")} />
        <Input
          type="number"
          placeholder="Monthly sales"
          {...form.register("monthly_sales")}
        />
      </div>

      {error && <p className="text-destructive text-sm font-medium">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Addressing..." : "Register Product"}
      </Button>
    </form>
  );
}
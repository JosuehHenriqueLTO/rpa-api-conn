import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductsList from "@/components/ProductsList";
import ProductRegisterForm from "@/components/ProductRegisterForm";

export default async function Home() {
  const cookieStore = await cookies();
  
  // Pegando dados do usuário salvos no login
  const userName = cookieStore.get("user_name")?.value || "Usuário";
  const userEmail = cookieStore.get("user_email")?.value || "email@email.com";

  return (
    <main className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Header do Usuário */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Olá, {userName}!</CardTitle>
              <CardDescription>{userEmail}</CardDescription>
            </div>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
              Funcionário
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Formulário de Registro */}
      <Card>
        <CardHeader>
          <CardTitle>Registrar Novo Produto</CardTitle>
          <CardDescription>Preencha os dados abaixo para enviar ao inventário.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductRegisterForm />
        </CardContent>
      </Card>

      {/* Lista de Produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsList />
        </CardContent>
      </Card>
    </main>
  );
}
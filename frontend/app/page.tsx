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
import UserGreetings from "@/components/UserGreetings";
import { getUserInfo } from "@/actions/auth";

export default async function Home() {
  const user = await getUserInfo();
  if (user.error) {
    return <div>Error: {user.error}</div>;
  }

  // const userAuthority = cookieStore.get("email")?.value || "Employee";

  return (
    <main className="p-8 max-w-5xl mx-auto space-y-6">
      <UserGreetings
        name={user.name}
        email={user.email}
        // userAuthority="adsaas"
      />

      <Card>
        <CardHeader>
          <CardTitle>Register New Product</CardTitle>
          <CardDescription>
            Fill in the details below to add it to the inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductRegisterForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsList />
        </CardContent>
      </Card>
    </main>
  );
}

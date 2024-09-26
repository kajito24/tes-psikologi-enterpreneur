import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginContainer from "@/components/login-container";

export default function Home() {
  if (cookies().has("user-token")) return redirect("/survey");

  return <LoginContainer />;
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Survey from "@/components/Survey";
import SignOut from "@/components/sign-out-button";

export default function SurveyPage() {
  const token = cookies().get("user-token");

  if (!token || !token.value) return redirect("/");

  return (
    <div className="w-screen h-screen flex flex-col items-center text-black">
      <div className="text-center">
        <h1 className="text-lg xl:text-5xl font-bold mt-8">
          Tes Jiwa Entrepeneur
        </h1>
        <SignOut />
      </div>

      <Survey />
    </div>
  );
}

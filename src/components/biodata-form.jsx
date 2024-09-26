"use client";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { signIn } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function BiodataForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (formData) => {
    setIsLoading(true);
    signIn(formData).then(() => {
      setIsLoading(false);
      router.replace("/survey");
    });
  };

  return (
    <>
      <div className="text-left">
        <form
          className="w-full flex flex-col gap-4"
          id="biodataForm"
          action={handleAction}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="inputFullName">Nama Lengkap</label>
            <input
              type="text"
              name="fullName"
              id="inputFullName"
              placeholder="John Doe"
              required
              value={fullName}
              className="p-2 min-h-4 rounded-md"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="inputbirthYear">Tahun Lahir</label>
            <input
              type="number"
              name="birthYear"
              id="inputbirthYear"
              min="1945"
              max="2035"
              required
              value={birthYear}
              className="p-2 min-h-4 rounded-md"
              onChange={(e) => {
                setBirthYear(e.target.value);
              }}
            />
          </div>
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={isLoading}
            loadingPosition="center"
          >
            Mulai
          </LoadingButton>
        </form>
      </div>
    </>
  );
}

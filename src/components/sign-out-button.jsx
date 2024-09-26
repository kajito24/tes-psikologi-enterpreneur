"use client";

import { useState } from "react";
import { signOut } from "@/app/actions";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { Logout } from "@mui/icons-material";

export default function SignOut() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    signOut().then(() => {
      setIsLoading(false);
      router.replace("/");
    });
  };

  return (
    <LoadingButton
      variant="outlined"
      color="error"
      onClick={handleSignOut}
      loading={isLoading}
      loadingPosition="center"
      startIcon={<Logout />}
    >
      Sign Out
    </LoadingButton>
  );
}

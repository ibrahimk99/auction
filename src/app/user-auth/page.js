"use client";
import Header from "@/app/components/Header";
import UserLogin from "@/app/components/login";
import UserSignup from "@/app/components/signup";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const userAuth = () => {
  const [login, setLogin] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Header />
      <div>
        {login ? (
          <div>
            <UserLogin />
            <button onClick={() => setLogin(false)}>
              if already have no Account plz Signup
            </button>
          </div>
        ) : (
          <div>
            {" "}
            <UserSignup />
            <button onClick={() => setLogin(true)}>
              if already have Account plz Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default userAuth;

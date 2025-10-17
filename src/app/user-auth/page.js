"use client";
import { useSession } from "next-auth/react";
import Header from "@/app/components/Header";
import UserLogin from "@/app/components/login";
import UserSignup from "@/app/components/signup";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginPageAction } from "../store/loginPageSlice";
const UserAuth = () => {
  const { status } = useSession();
  const router = useRouter();
  const loginPage = useSelector((state) => state.loginPage);
  const dispatch = useDispatch();
  const handleLoginPage = (value) => {
    dispatch(loginPageAction.setLogin(value));
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/home");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Header />
      <div>
        {loginPage ? (
          <div>
            <UserLogin />
            <button onClick={() => handleLoginPage(false)}>
              if already have no Account plz Signup
            </button>
          </div>
        ) : (
          <div>
            <UserSignup />
            <button onClick={() => handleLoginPage(true)}>
              if already have Account plz Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserAuth;

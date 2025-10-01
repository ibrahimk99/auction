"use client"; // 👈 important
import { signIn } from "next-auth/react";
import styles from "./login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res.error) {
      console.log("Login failed: " + res.error);
    } else {
      console.log("Login successful!");
      router.push("/");
    }
  };

  return (
    <div>
      <div className="page-body">
        <form className={styles.loginForm} onSubmit={handleSubmitForm}>
          <div className={styles.userInput}>
            <label htmlFor="email">Email : </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.userInput}>
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UserLogin;

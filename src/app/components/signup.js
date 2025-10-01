"use client"; // 👈 important
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { useState } from "react";
import { signIn } from "next-auth/react";

const UserSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const router = useRouter();
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(name, email, password, role);
    let res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    if (res.ok) {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!result?.error) {
        router.push("/user-auth"); // redirect where you want
      } else {
        console.log(result.error);
      }
    }
  };

  return (
    <div>
      <div className="page-body">
        <form className={styles.loginForm} onSubmit={handleSignup}>
          <div className={styles.userInput}>
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className={styles.userInput}>
            <label htmlFor="role">Role : </label>
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default UserSignup;

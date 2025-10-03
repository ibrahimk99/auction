import Link from "next/link";
import Header from "../components/Header";
export default function NotFound() {
  return (
    <div>
      <Header />
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/home">Go to Home</Link>
    </div>
  );
}

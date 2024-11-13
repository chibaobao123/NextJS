"use client";
import { useRouter } from "next/navigation";

export default function Facebook() {
  const router = useRouter();
  const backHome = () => {
    router.push("/");
  };
  return (
    <div>
      Facebook
      <div>
        <button onClick={() => backHome()}>Back Home</button>
      </div>
    </div>
  );
}

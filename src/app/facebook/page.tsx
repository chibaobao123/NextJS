"use client";
import { useRouter } from "next/navigation";

import { Button } from "react-bootstrap";

export default function Facebook() {
  const router = useRouter();
  const backHome = () => {
    router.push("/");
  };
  return (
    <div>
      Facebook
      <div>
        <Button variant="success">React-Bootstrap</Button>
        <button onClick={() => backHome()}>Back Home</button>
      </div>
    </div>
  );
}

"use client";

// import Link from "next/link";
import Table from "@/Component/table";
import { useEffect } from "react";

// import x from "@/styles/app.module.css";
// import y from "@/styles/test.module.css";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8000/blogs");
      const data = await res.json();
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      {/* <ul>
        <li className={x["red"]}>
          <Link href="/facebook">
            <span className={y["red"]}>facebook</span>
          </Link>
        </li>
        <li className="green">
          <Link href="/youtube">youtube</Link>
        </li>
        <li>
          <Link href="/tiktok">tiktok</Link>
        </li>
      </ul> */}
      <Table />
    </div>
  );
}

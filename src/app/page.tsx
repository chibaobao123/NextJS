"use client";

// import Link from "next/link";
import Table from "@/Component/table";
import { useEffect } from "react";
import useSWR from "swr";

// import x from "@/styles/app.module.css";
// import y from "@/styles/test.module.css";

export default function Home() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  console.log(data);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch();
  //     const data = await res.json();
  //     console.log(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="container">
      <div>{data?.length}</div>
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

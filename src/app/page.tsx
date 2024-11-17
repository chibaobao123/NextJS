"use client";

// import Link from "next/link";
import Table from "@/Component/table";
import CreateTable from "@/Component/create.modal";

import { Button } from "react-bootstrap";
import useSWR from "swr";

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

  // console.log(data);
  // console.log(error);
  // console.log(isLoading);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // render data
  return (
    <div className="container">
      <div>{data?.length}</div>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Table blogs</h3>
        <CreateTable />
      </div>
      <Table blogs={data} />
    </div>
  );
}

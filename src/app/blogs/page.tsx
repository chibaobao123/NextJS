"use client";
import Table from "@/Component/table";
import CreateTable from "@/Component/create.modal";

import useSWR from "swr";

export default function Header() {
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

  return (
    <div className="container">
      <div
        className="my-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Table blogs</h3>
        <CreateTable />
      </div>

      <Table blogs={data?.sort((a: any, b: any) => b.id - a.id) ?? []} />
    </div>
  );
}

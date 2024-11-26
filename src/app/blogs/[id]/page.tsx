"use client";
import Link from "next/link";
import useSWR, { Fetcher } from "swr";
import { use } from "react";

import Card from "react-bootstrap/Card";

const ViewDetailBlog = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); // Sử dụng React.use để unwrap

  const fetcher: Fetcher<IBlog, string> = (...args) =>
    fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${id}`,
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
    <div className="container my-3">
      <Link href="/blogs" className="btn btn-primary mb-3">
        Go back
      </Link>
      <Card className="text-center">
        <Card.Header>{data?.author}</Card.Header>
        <Card.Body>
          <Card.Title>{data?.title}</Card.Title>
          <Card.Text>{data?.content}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default ViewDetailBlog;

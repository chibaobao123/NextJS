"use client";
import { useState } from "react";
import Link from "next/link";

import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import UpdateModal from "@/Component/update.modal";

interface IProps {
  blogs: IBlog[];
}

export default function table(props: IProps) {
  const { blogs } = props;
  const [blogItem, setBlog] = useState<IBlog | null>(null);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <Link className="btn btn-primary" href={`/blogs/${item.id}`}>
                    View
                  </Link>
                  <Button
                    variant="warning"
                    className="mx-3"
                    onClick={() => {
                      setBlog(item);
                      setShowModalUpdate(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger">delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <UpdateModal
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        blog={blogItem}
        setBlog={setBlog}
      />
    </>
  );
}

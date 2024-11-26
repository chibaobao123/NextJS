"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { mutate } from "swr";

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

  const handleDeleteBlog = (id: number) => {
    if (confirm(`Are you sure you want to delete this blog (id: ${id})?`)) {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (res) {
          if (res) {
            console.log(res);
            toast.success("successfully deleted");
            console.log(JSON.stringify(res));
            mutate(`http://localhost:8000/blogs`);
          }
        });
    } else {
      toast.warning("delete cancelled");
    }
  };
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
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBlog(item.id)}
                  >
                    Delete
                  </Button>
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

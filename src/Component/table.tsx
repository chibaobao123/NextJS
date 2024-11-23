"use client";
import Table from "react-bootstrap/Table";

import { Button } from "react-bootstrap";

import UpdateModal from "@/Component/update.modal";

interface IProps {
  blogs: IBlog[];
}

export default function table(props: IProps) {
  const { blogs } = props;
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
                  <Button>view</Button>
                  <UpdateModal blog={item} />
                  <Button variant="danger">delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

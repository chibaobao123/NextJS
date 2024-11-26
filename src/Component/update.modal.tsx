"use client";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  blog: IBlog | null;
  setBlog: (value: IBlog | null) => void;
}

function UpdateModal(props: IProps) {
  const { showModalUpdate, setShowModalUpdate, blog, setBlog } = props;

  const [idItem, setidItem] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [disabled, setDisabled] = useState<boolean>(true);

  const [oldTitle, setOldTitle] = useState<string>("");
  const [oldAuthor, setOldAuthor] = useState<string>("");
  const [oldContent, setOldContent] = useState<string>("");

  useEffect(() => {
    if (blog && blog.id) {
      setidItem(blog.id);
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);

      setOldTitle(blog.title);
      setOldAuthor(blog.author);
      setOldContent(blog.content);
    }
  }, [blog]);

  const handleSubmit = () => {
    // Here you can call your API to create a new post
    fetch(`http://localhost:8000/blogs/${idItem}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        if (res) {
          console.log(res);
          toast.success("successfully created");
          handleClose();
          console.log(JSON.stringify(res));
          mutate(`http://localhost:8000/blogs`);
        }
      });
  };

  const handleChange = (e) => {
    const inp = e.target.name;
    const val = e.target.value.trim();

    // console.log(inp, val);

    if (inp == "title") {
      if (!val) {
        toast.error("Title cannot be empty");
        setDisabled(true);
        return;
      } else if (val == oldTitle) {
        toast.error("Title  has not changed");
        setDisabled(true);
        return;
      }
      setTitle(val);
    }
    if (inp == "author") {
      if (!val) {
        toast.error("Author cannot be empty");
        setDisabled(true);
        return;
      } else if (val == oldAuthor) {
        toast.error("Author  has not changed");
        setDisabled(true);
        return;
      }
      setAuthor(val);
    }
    if (inp == "content") {
      if (!val) {
        toast.error("Content cannot be empty");
        setDisabled(true);
        return;
      } else if (val == oldContent) {
        toast.error("Content  has not changed");
        setDisabled(true);
        return;
      }
      setContent(val);
    }

    setDisabled(false);
  };

  const handleClose = () => {
    setTitle("");
    setAuthor("");
    setContent("");

    setOldTitle("");
    setOldAuthor("");
    setOldContent("");

    setDisabled(true);

    setBlog(null);
    setShowModalUpdate(false);
  };
  return (
    <>
      <Modal
        show={showModalUpdate}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                defaultValue={title}
                onChange={(e) => handleChange(e)}
                name="title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                defaultValue={author}
                onChange={(e) => handleChange(e)}
                name="author"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => handleChange(e)}
                defaultValue={content}
                name="content"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmit()}
            disabled={disabled}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;

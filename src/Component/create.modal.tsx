"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { mutate } from "swr";

function CreateModal() {
  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = () => {
    // console.log(title, author, content);

    const validates = validate(title, author, content);
    console.log(validates);
    if (validates == false) return;
    // Here you can call your API to create a new post
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data) {
          toast.success("successfully created");
          handleClose();
          console.log(JSON.stringify(data));
          mutate("http://localhost:8000/blogs");
        }
      });
  };

  //validates
  const validate = (title: string, author: string, content: string) => {
    if (!title) {
      toast.error("Title cannot be empty");
      return false;
    }
    if (!author) {
      toast.error("author cannot be empty");
      return false;
    }
    if (!content) {
      toast.error("content cannot be empty");
      return false;
    }
    return true;
  };

  const handleClose = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    handleCloseModal();
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Add New
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new a blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                onChange={(e) => setTitle(e.target.value.trim())}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                onChange={(e) => setAuthor(e.target.value.trim())}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setContent(e.target.value.trim())}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;

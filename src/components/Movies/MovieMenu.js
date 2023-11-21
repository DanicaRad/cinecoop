import React, { useContext, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Modal, Form, ListGroup } from "react-bootstrap";
import UserContext from "../Auth/UserContext";
import MovieButtons from "../buttons/MovieButtons";
import styles from "./Movies.module.css";
import CinecoopApi from "@/Api";

export default function MovieMenu({ id, title }) {
  const { data: session } = useSession();
  const { userLists, setUserLists } = useContext(UserContext);
  const [dataToUpdate, setDataToUpdate] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(evt) {
    setDataToUpdate({ listId: evt.target.id, movieId: id, action: "add" });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = await CinecoopApi.addToList(
      session.username,
      dataToUpdate.listId,
      { movieId: id, action: "add" }
    );
    console.log("res.data", res.data);
  }

  function isPrivate(list) {
    if (list.isPrivate) {
      return  "visible";
    }
    return "invisible";
  }

  if (!session) {
    return (
      // <div
      //   className='btn-group-vertical'
      //   role='group'
      //   aria-label='Vertical button group'
      //   style={{ backgroundColor: "#183717" }}
      // >
      //   <button type='button' className='btn text-center' onClick={signIn}>
      //     Sign in to log, rate or review
      //   </button>
      //   <button type='button' className='btn text-center' onClick={signIn}>
      //     Sign Up
      //   </button>
      // </div>
      <div className={styles.movieMenu}>
        <a href='/auth/signin' className={styles.link}>
          <div className='p-2'>Sign In</div>
        </a>
        <div className='p-2'>Second item</div>
        <div className='p-2'>Third item</div>
      </div>
    );
  }
  if (!userLists) return <div>Loading</div>;

  return (
    <ListGroup>
      <ListGroup.Item
        variant='light'
        className='dark-bg-subtle'
      >
        <MovieButtons id={id} component={"moviePage"} />
      </ListGroup.Item>
      <ListGroup.Item
        className='text-center'
        onClick={handleShow}
        variant='light'
        action
      >
        Add To List
      </ListGroup.Item>
      <ListGroup.Item className='text-center' variant='light' action>
        <Link href={`/${session.username}/list/new/${id}`}>
          <i className='bi bi-plus-lg' /> New List
        </Link>
      </ListGroup.Item>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add &#39;{title}&#39; to lists</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className='d-grid gap-1 text-start'>
            <input
              type='checkbox'
              className='btn-check'
              id='btn-check-4'
              autoComplete='off'
            />
            {userLists.map((l) => (
              <div key={l.id} className='d-grid justify-self-start'>
                <input
                  type='checkbox'
                  className='btn-check text-start'
                  id={l.id}
                  autoComplete='off'
                  onChange={handleChange}
                  checked={l.movies[id]}
                  disabled={l.movies[id]}
                />
                <label className='btn' htmlFor={l.id}>
                  {l.name}{" "}
                  <span className={isPrivate(l)}>
                    <i className='bi bi-lock-fill' />
                  </span>{" "}
                </label>
              </div>
            ))}
          </Form>
          <div className='d-grid text-center'>
            <Link href={`/${session.username}/list/new/${id}`}>
              <i className='bi bi-plus-lg' />  New List...
            </Link>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-success btn-sm' onClick={handleClose}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </ListGroup>
  );
}

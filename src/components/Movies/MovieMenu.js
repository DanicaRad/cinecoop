import React, { useContext, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Modal, Form, ListGroup } from 'react-bootstrap';
import UserContext from '../Auth/UserContext';
import MovieButtons from '../buttons/MovieButtons';
import styles from './Movies.module.css';
import CinecoopApi from '@/Api';

export default function MovieMenu ({ id, title }) {
	const { data: session } = useSession();
	const { userLists, setUserLists } = useContext(UserContext);
	const [ dataToUpdate, setDataToUpdate ] = useState();
	const [ show, setShow ] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

  function handleChange(evt) {
    setDataToUpdate({listId: evt.target.id, movieId: id, action: "add"})
	}

	async function handleSubmit (evt) {
    evt.preventDefault();
    const res = await CinecoopApi.addToList(session.username, dataToUpdate.listId, { movieId: id, action: "add" });
    console.log("res.data", res.data);
	}

	function isPrivate(list) {
		if (list.isPrivate) {
			return (list.name + " " + <i className='bi bi-lock-fill' />);
		}
		return list.name;
	}


	if (!session) {
		return (
			<div className='list-group'>
				<button type='button' className='list-group-item list-group-item-action text-center' onClick={signIn}>
					Sign in to log, rate or review
				</button>
				<button type='button' className='list-group-item list-group-item-action text-center' onClick={signIn}>
					Sign Up
				</button>
			</div>
		);
	}
	if (!userLists) return <div>Loading</div>;

	return (
    <ListGroup className={styles.movieMenu}>
      <button
        type='button'
        className='list-group-item list-group-item-action text-center text-bg-dark'
      >
        <MovieButtons id={id} component={"moviePage"} />
      </button>
      <button
        type='button'
        className='list-group-item list-group-item-action text-center text-bg-dark'
        onClick={signIn}
      >
        Sign Up
      </button>
      <button
        type='button'
        className='list-group-item list-group-item-action text-center text-bg-dark'
        onClick={handleShow}
      >
        Add To List
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add &#39;{title}&#39; to lists</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className='d-grid gap-1'>
            <input
              type='checkbox'
              className='btn-check'
              id='btn-check-4'
              autoComplete='off'
            />
            <label className='btn' htmlFor='btn-check-4'>
              Single toggle <i className='bi bi-lock-fill' />
            </label>
            {userLists.map((l) => (
              <div key={l.id} className='d-grid'>
                <input
                  type='checkbox'
                  className='btn-check'
                  id={l.id}
                  autoComplete='off'
                  onChange={handleChange}
                  checked={l.movies[id]}
                  disabled={l.movies[id]}
                />
                <label className='btn' htmlFor={l.id}>
                  {isPrivate(l)}
                </label>
              </div>
            ))}
          </Form>
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

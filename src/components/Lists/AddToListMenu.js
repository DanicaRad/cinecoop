import React, { useContext, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Modal, Form } from 'react-bootstrap';
import UserContext from '../Auth/UserContext';
import MovieButtons from '../buttons/MovieButtons';

export default function MovieMenu ({ id, title }) {
	const { data: session } = useSession();
	const {  userLists, setUserLists } = useContext(UserContext);
	const [ show, setShow ] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


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
		<div className='list-group'>
			<button type='button' className='list-group-item list-group-item-action text-center' onClick={signIn}>
				<MovieButtons id={id} component={'moviePage'} />
			</button>
			<button type='button' className='list-group-item list-group-item-action text-center' onClick={signIn}>
				Sign Up
			</button>
			<button type='button' className='list-group-item list-group-item-action text-center' onClick={handleShow}>
				Add To List
			</button>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Add <i>{title}</i>to lists</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='d-grid'>
							<input type='checkbox' className='btn-check' id='btn-check-4' autocomplete='off' />
            <label className='btn' for='btn-check-4'>
                Single toggle <i className='bi bi-lock-fill' />
              </label>
						{userLists.map((l) => (
							<div className='form-check text-end' key={l.id}>
								<input className='form-check-input' type='checkbox' value='' id={l.id} />
								<label className='form-check-label' htmlFor={l.id}>
									{l.isPrivate && <i className='bi bi-lock-fill' />} {l.name}
								</label>
							</div>
						))}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<button className='btn' onClick={handleClose}>
						Add
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
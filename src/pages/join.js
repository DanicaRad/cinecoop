import { useState } from 'react';
import CinecoopApi from '@/Api';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// fastX: 385687, john wick: 603692,

export default function Page() {
	const router = useRouter();
	const { data: session } = useSession();

	if (session) {
		router.push('/');
	}

	const [ form, updateForm ] = useState({
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		password: ''
	});

	const [ list, setList ] = useState(null);

	// collect user input as it is inputted
	function handleChange (evt) {
		evt.persist();
		updateForm((data) => ({ ...data, [evt.target.name]: evt.target.value }));
	}

	// make API call to register user
	async function handleSubmit (evt) {
		evt.preventDefault();
		const res = await CinecoopApi.register(form);
		router.push({pathname: '/auth/signin', query: {newUser: res.data.username}})
	}

	async function createList (evt) {
		evt.preventDefault();
		const list = await CinecoopApi.createList('testuser', { name: 'Test List 2', isPrivate: false });
		setList(list);
		console.log('list', list);
	}

	async function updateList (evt) {
		evt.preventDefault();
		const list = await CinecoopApi.updateList(19, { name: 'ANOTHER UPDATED list!', isPrivate: true });
		setList(list);
		console.log('list', list);
	}

	async function addToList (evt) {
		evt.preventDefault();
		const added = await CinecoopApi.addToList(1, { movieId: 569094 });
		console.log('added movie to list', added);
	}

	const { username, firstName, lastName, email, phone, password } = form;

	return (
		<div>
			<div className='fw-lighter lead text-uppercase border-bottom border-2'>JOIN CINECOOP</div>
			<form onSubmit={handleSubmit} className='mt-3'>
				<div>
					<label htmlFor='username' className='form-label'>
						Username
					</label>
					<input type='text' id='username' name='username' onChange={handleChange} className='form-control' required />
				</div>
				<div>
					<label htmlFor='firstName' className='form-label'>
						First Name
					</label>
					<input type='text' id='firstName' name='firstName' onChange={handleChange} className='form-control' required />
				</div>
				<div>
					<label htmlFor='lastName' className='form-label'>
						Last Name
					</label>
					<input type='text' id='lastName' name='lastName' onChange={handleChange} className='form-control' required />
				</div>
				<div>
					<label htmlFor='email' className='form-label'>
						Email
					</label>
					<input type='email' id='email' name='email' onChange={handleChange} className='form-control' required />
				</div>
				<div>
					<label htmlFor='phone' className='form-label'>
						Phone
					</label>
					<input type='tel' id='phone' name='phone' onChange={handleChange} className='form-control' required />
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input type='password' id='password' name='password' onChange={handleChange} className='form-control' required />
				</div>
				<button className='btn btn-light btn-sm mt-3'>SIGN UP</button>
			</form>
		</div>
	);
}

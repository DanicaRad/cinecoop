import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Page () {
	const router = useRouter();
	const username = router.query.username;
	const [ form, setForm ] = useState({
		email: '',
		exampleCheck1: false
	});
	const [ userInput, updateUserInput ] = useState({});

	function handleChange (evt) {
		evt.persist();
		setForm((f) => ({ ...f, [evt.target.name]: evt.target.value }));
		updateUserInput((d) => ({ ...d, [evt.target.name]: evt.target.value }));
	}

	function handleSubmit (evt) {
		evt.preventDefault();
		console.log('submitted user input', userInput);
		console.log('form data', form);
	}

	const { email, exampleCheck1 } = form;

	return (
    <div>
      <h1>{username}</h1>
      <p>You must consolidate users_movies and watchlist into one table!</p>
      <form onSubmit={handleSubmit}>
        <div class='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            name='email'
            className='form-control'
            id='email'
            aria-describedby='emailHelp'
            onChange={handleChange}
          />
          <div id='emailHelp' className='form-text'>
            We&#39ll never share your email with anyone else.
          </div>
        </div>
        <div class='mb-3 form-check'>
          <input
            type='checkbox'
            name='exampleCheck1'
            className='form-check-input'
            id='exampleCheck1'
            onChange={handleChange}
          />
          <label className='form-check-label' htmlFor='exampleCheck1'>
            Check me out
          </label>
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
}

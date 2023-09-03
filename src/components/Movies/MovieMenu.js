import React, { useContext } from 'react';
import { signIn, useSession } from 'next-auth/react';
import UserContext from '../Auth/UserContext';

export default function MovieMenu({ id }) {
  const { data: session } = useSession();
	const { currUser, userMovies, setUserMovies } = useContext(UserContext);

	if (!session) {
		return (
			<ul className='list-group'>
				<li className='list-group-item' onClick={signIn}>
					Sign in to log, rate or review
				</li>
				<li className='list-group-item'>Sign Up</li>
			</ul>
		);
  };

  return (
			<ul className='list-group'>
				<li className='list-group-item' onClick={signIn}>
					Sign in to log, rate or review
				</li>
				<li className='list-group-item'>Sign Up</li>
			</ul>
		);  
}

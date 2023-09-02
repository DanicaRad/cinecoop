import React, { useContext, useEffect, useState } from 'react';
import CinecoopApi from '@/Api';
import styles from './Buttons.module.css';
import UserContext from '../Auth/UserContext';

export default function WatchedButton({ watched }) {
const [className, setClassName] = useState();
  
  useEffect(() => {
    setClassName(watched ? styles.watched : styles.false);
  }, [watched])

  function handleClick() {
    setClassName(className === styles.watched ? styles.false : styles.watched);
  }

	return (
		<a className={className} onClick={handleClick}>
			<i data-key='watched' className='bi bi-eye-fill' />
		</a>
	);
}

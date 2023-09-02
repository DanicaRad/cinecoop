import React, { useEffect, useState } from 'react';
import styles from './Buttons.module.css';

export default function FavoriteButton ({ isFavorite }) {
  const [className, setClassName] = useState();
  
  useEffect(() => {
    setClassName(isFavorite ? styles.favorite : styles.false);
  }, [isFavorite])

  function handleClick() {
    setClassName(className === styles.favorite ? styles.false : styles.favorite);
  }

	return (
		<a className={className} onClick={handleClick}>
			<i data-key='favorite' className='bi bi-suit-heart-fill' />
		</a>
	);
}

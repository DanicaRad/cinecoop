import React, { useEffect, useState } from 'react';
import styles from './Buttons.module.css';

export default function WatchlistButton ({ watchlist }) {
  const [className, setClassName] = useState();
  
  useEffect(() => {
    setClassName(!watchlist ? styles.false : styles.watchlist);
  }, [watchlist])

  function handleClick() {
    setClassName(className === styles.watchlist ? styles.false : styles.watchlist);
  }

	return (
		<a className={className} onClick={handleClick}>
			<i data-key='watchlist' className='bi bi-clock-fill' />
		</a>
	);
}

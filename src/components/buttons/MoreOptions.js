import React, {useEffect, useState} from "react";
import styles from './Buttons.module.css';

export default function MoreOptions({ isClicked }) {
  const [className, setClassName] = useState();

  useEffect(() => {
    setClassName(isClicked ? styles.watched : styles.false);
  }, [isClicked])

  return (
    <button className={className}>
      <i className="bi bi-three-dots"></i>
    </button>
  )
}
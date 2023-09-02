import React from "react";
import { useState } from "react";

export default function ListLikes({ list }) {
  const [likes, setLikes] = useState(list.likes);

  function handleClick(e) {
    e.preventDefault();
    
  }
}
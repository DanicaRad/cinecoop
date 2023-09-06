import CinecoopApi from "@/Api";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function NavSearch() {
  const router = useRouter();
  const [query, updateQuery] = useState();

  function handleChange(evt) {
    evt.persist();
    updateQuery(evt.target.value);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("query", query);
    // query.replace(' ', '%20')
    // const res = await CinecoopApi.searchMovies(query);
    // console.log("res.data in search", res.data);
    router.push(`/movies/search/${query}`);
  }

  return (
    <form className='d-flex' role='search' onSubmit={handleSubmit}>
      <input
        className='form-control me-2'
        type='search'
        placeholder='Search'
        aria-label='Search'
        onChange={handleChange}
      />
      <button
        className='btn btn-outline fw-lighter text-uppercase'
        type='submit'
      >
        <i className='bi bi-search'></i>
      </button>
    </form>
  );
}

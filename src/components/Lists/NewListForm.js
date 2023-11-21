import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import CinecoopApi from "@/Api";
import ListMovieCard from "./ListMovieCard";
import UserContext from "../Auth/UserContext";

export default function NewListForm({ movieId }) {
  if (movieId) console.log("movieId", movieId);
  const { data: session } = useSession();
  const { userLists, setUserLists } = useContext(UserContext);
  const [form, updateForm] = useState({
    name: "",
    description: "",
    isPrivate: false,
  });

  // collect user input as it is inputted
  function handleChange(evt) {
    evt.persist();
    updateForm((data) => ({ ...data, [evt.target.name]: evt.target.value }));
  }

  // make API call to create new list, format list and add to session lists
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("form", { ...form, movieId });
    const res = await CinecoopApi.createList(session.username, { ...form, movieId });
    console.log("res.data", res.data);
    addListToSession(res.data);
    console.log("new list created");
  }

  // formats list, adds to user session
  function addListToSession(list) {
    if (list.movies) list.movies = { movieId: true };
    setUserLists([...userLists, list]);
    console.log("userLists after adding to session", userLists);
  }

  if(session) return (
    <div>
      <div className='fw-lighter lead text-uppercase border-bottom border-2'>
        New List
      </div>
      <form onSubmit={handleSubmit} className='mt-3'>
        <div>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            onChange={handleChange}
            className='form-control'
            required
          />
        </div>
        <div>
          <label htmlFor='isPrivate'>Who can view</label>
          <select
            className='form-select'
            id='isPrivate'
            name='isPrivate'
            aria-label='List Privacy Setting'
            onChange={handleChange}
          >
            <option defaultValue='false'>Anyone - Public list</option>
            <option value='true'>You - Private list</option>
          </select>
        </div>
        <div>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea
            className='form-control'
            id='description'
            name='description'
            rows='3'
            onChange={handleChange}
          ></textarea>
        </div>
        <button className='btn btn-light btn-sm mt-3'>Save</button>
        <a href={`/${session.username}/lists`} className="btn btn-secondary btn-sm mt-3 ms-3">Cancel</a>
      </form>
      <ListMovieCard movieId={movieId} />
    </div>
  );
}

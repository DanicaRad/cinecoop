import React, { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Alert } from "react-bootstrap";
import CinecoopApi from "@/Api";
import UserContext from "../Auth/UserContext";

export default function UpdateListForm({ list }) {
  const { data: session } = useSession();
  const { userLists, setUserLists } = useContext(UserContext);
  const [form, updateForm] = useState({
    name: list.name,
    description: list.description,
    isPrivate: list.isPrivate,
  });
  const [alert, setAlert] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setVisible(false);
      setAlert(null);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [alert]);

  // collect user input as it is inputted
  function handleChange(evt) {
    evt.persist();
    updateForm((data) => ({ ...data, [evt.target.name]: evt.target.value }));
  }

  // make API call to update list, format list and add to session lists
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      console.log("form", form);
      const res = await CinecoopApi.updateList(list.id, { ...form });
      console.log("res.data", res.data);
      showAlert("List Updated", "alert-success");
    } catch (err) {
      console.error("error", err);
      showAlert("Could not update list.", "alert-danger");
    }
  }

  function showAlert(message, color) {
    const onDismiss = () => setVisible(false);
    setAlert(
      <Alert className={color} isOpen={visible} toggle={onDismiss}>
        {message}
      </Alert>
    );
  }

  // formats list, adds to user session
  function addListToSession(list) {
    if (list.movies) list.movies = { movieId: true };
    setUserLists([...userLists, list]);
    console.log("userLists after adding to session", userLists);
  }

  // function privacySetting() {
  //   if (list.isPrivate) return (
  //     <option defaultValue='false'>Anyone - Public list</option>
  //             <option value='true'>You - Private list</option>
  //   )
  // }

  if (session)
    return (
      <div>
        {alert}
        <div className='fw-lighter lead text-uppercase border-bottom border-2 mt-3'>
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
              value={form.name}
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
              <option defaultValue={list.isPrivate}>
                {!list.isPrivate
                  ? "Anyone - Public list"
                  : "You - Private list"}
              </option>
              <option value={!list.isPrivate}>
                {list.isPrivate ? "Anyone - Public list" : "You - Private list"}
              </option>
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
              value={form.description}
              rows='3'
              onChange={handleChange}
            ></textarea>
          </div>
          <button className='btn btn-light btn-sm mt-3'>Save</button>
          <a
            href={`/${session.username}/lists`}
            className='btn btn-secondary btn-sm mt-3 ms-3'
          >
            Cancel
          </a>
        </form>
      </div>
    );
}

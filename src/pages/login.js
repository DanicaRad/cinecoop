import { useContext, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import CinecoopApi from "@/Api";

export default function Page() {
  const [form, updateForm] = useState({
    username: "",
    password: ""
  });

   // collect user input as it is inputted
  function handleChange(evt) {
    evt.persist();
    updateForm(data => ({...data, [evt.target.name]: evt.target.value}));
  };

  // make API call to login user
  async function handleSubmit(evt) {
    evt.preventDefault();
    // const user = await CinecoopApi.login(form);
    const user = await signIn(form);
    console.log("user", user);
  };

  const { username, password } = form;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" autoComplete="username" onChange={handleChange} value={ username} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" autoComplete="current-password" onChange={handleChange} value={password} required />

        <button>Login</button>
      </form>
    </>
  )
}
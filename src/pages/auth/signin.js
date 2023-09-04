import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import CinecoopApi from "@/Api";

export default function Page() {
  const router = useRouter();
  const [message, setMessage] = useState(null)
  const [newUser, setNewUser] = useState(null);

  useEffect(() => {
    const { newUser } = router.query;
    if (newUser){ 
    setNewUser(newUser);
      setMessage(`Welcome, ${newUser}! Please log in to complete registration.`)
    }
  }, [router.isReady])

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
    signIn("credentials", form);
    // const user = await CinecoopApi.login(form);
    router.push("/");
  };

  const { username, password } = form;

  return (
    <div className="container w-75 mx-auto">
      <div className='fw-lighter lead text-uppercase border-bottom border-2'>Welcome back</div>
      {message}
      <form className="mt-3" onSubmit={handleSubmit}>
        <label htmlFor="username" className='form-label'>Username</label>
        <input type="text" id="username" name="username" autoComplete="username" onChange={handleChange} value={ username} required className="form-control"/>

        <label htmlFor="password" className='form-label'>Password</label>
        <input type="password" id="password" name="password" autoComplete="current-password" onChange={handleChange} value={password} required className="form-control"/>

        <button className="btn btn-light btn-sm mt-3 sm">SIGN IN</button>
      </form>
    </div>
  )
}
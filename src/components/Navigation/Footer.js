import React from "react";

export default function Footer() {
  return (
    <nav className='navbar bottom bg-body-tertiary'>
      <div className='container-fluid'>
        <div className='text-center m-auto text-body-tertiary pt-2 pb-5 fw-lighter'>
          <small>
            Cinecoop is demo app inspired by the design and functionality of{" "}
            <a href='https://letterboxd.com/'>Letterboxd</a>
          </small>
        </div>
      </div>
    </nav>
  );
}
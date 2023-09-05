import { useSession } from 'next-auth/react';

export default function HomeBanner() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className='container'>
        <div className='display-5 text-center pt-5 pb-4'>
          Welcome back, {session.username}
        </div>
        <div className='text-center text-body-tertiary pt-3 fw-lighter'>
          <small>
            Cinecoop is demo app inspired by the design and functionality of <a href='https://letterboxd.com/'>Letterboxd</a>
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='display-5 text-center pt-5 pb-4'>Welcome to Cinecoop</div>
      <div className='text-center pb-3'>
        <button className='btn btn-success fw-lighter'>SIGN UP</button>
      </div>
      <div className='lead fw-lighter text-center'>
        A social network for film lovers.
      </div>
      <div className='lead fw-lighter text-center'>
        Track films you&#39ve watched, save ones you want to see.
      </div>
      <div className='lead fw-lighter text-center'>
        Share with your friends, discover from strangers.
      </div>
      <div className='text-center text-body-tertiary pt-3 fw-lighter'>
        <small>
          A demo app inspired by the design and functionality of <a href='https://letterboxd.com/'>Letterboxd</a>
        </small>
      </div>
    </div>
  );
}

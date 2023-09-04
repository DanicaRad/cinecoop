import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CinecoopApi from '@/Api';
import ListCard from '@/components/Lists/ListCard';
import { useSession } from 'next-auth/react';

export default function Lists () {
	const { data: session } = useSession();

	const router = useRouter();
	const [ username, setUsername ] = useState(null);
	const [ lists, setLists ] = useState(null);

	useEffect(
		() => {
			if (!router.isReady) return;
			const { username } = router.query;
			console.log("session", session);
			setUsername(username);
			async function getLists () {
				const results = await CinecoopApi.getUsersLists(username);
				console.log("list results in lists page", results);
				setLists(results.data);
			}
			getLists();
		},
		[ router.isReady ]
	);

	if (!lists) return <div>loading</div>;

	return (
    <div className='container w-75'>
      <div className='display-6 pt-5 pb-4'>
        {session && session.username === username ? 'Your lists' : `${username}'s lists`}
      </div>
      <div className='row row-cols-4'>
        {lists.map((l) => (
          <div className='col' key={l.id}>
            <ListCard key={l.id} list={l} />
          </div>
        ))}
      </div>
    </div>
  );
}

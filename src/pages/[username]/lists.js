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
				const results = await CinecoopApi.getLists(username);
				setLists(results.data);
			}
			getLists();
		},
		[ router.isReady ]
	);

	if (!lists) return <div>loading</div>;

	return (
		<div className='row row-cols-auto'>
			{lists.map((l) => (
				<div className='col' key={l.id}>
					<ListCard key={l.id} list={l} />
				</div>
			))}
		</div>
	);
}

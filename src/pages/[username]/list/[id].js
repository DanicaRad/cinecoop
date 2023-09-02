import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CinecoopApi from '@/Api';
import ListDetail from '@/components/Lists/ListDetail';

export default function List () {
	const router = useRouter();
	const [ list, setList ] = useState(null);

	useEffect(
		() => {
			if (!router.isReady) return;
			const { id } = router.query;
			console.log('id', id);
			async function getList () {
        const results = await CinecoopApi.getList(id);
        console.log("results.data", results.data)
				setList(results.data);
			}
			getList();
		},
		[ router.isReady ]
	);

	if (!list) return <div>Loading</div>;

	return <ListDetail list={list} />;
}

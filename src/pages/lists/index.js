import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CinecoopApi from "@/Api";
import ListCard from "@/components/Lists/ListCard";
import { useSession } from "next-auth/react";

export default function Lists() {
  const { data: session } = useSession();

  const [lists, setLists] = useState(null);

  useEffect(() => {

    async function getLists() {
      const results = await CinecoopApi.getAllLists();
      console.log("list results in lists page", results);
      setLists(results.data);
    }
    getLists();
  }, []);

  if (!lists) return <div>loading</div>;

  return (
    <div className='container'>
      <div className='lead fw-lighter text-center pt-5 pb-4'>
        Collect, curate, and share. Lists are the perfect way to group films.
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

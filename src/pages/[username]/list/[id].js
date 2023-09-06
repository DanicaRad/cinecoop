import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CinecoopApi from "@/Api";
import ListDetail from "@/components/Lists/ListDetail";

export default function List() {
  const router = useRouter();
  const [list, setList] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    async function getList(id) {
      const results = await CinecoopApi.getList(id);
      console.log("results.data", results.data);
      setList(results.data);
    }
    getList(id);
  }, [router.isReady]);

  if (!list) return <div>Loading</div>;

  return <ListDetail list={list} />;
}

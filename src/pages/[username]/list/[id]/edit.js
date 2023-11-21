import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import CinecoopApi from "@/Api";
import UpdateListForm from "@/components/Lists/UpdateListForm";
// import UpdateListForm from "@/components/Lists/NewListForm";

export default function Page() {
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
  
  return <UpdateListForm list={list} />;
}

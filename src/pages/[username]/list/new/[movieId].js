import React from "react";
import { useRouter } from "next/router";
import NewListForm from "@/components/Lists/NewListForm";

export default function Page() {
  const router = useRouter();
  const { movieId } = router.query;
  console.log("router.query", router.query);
  return <NewListForm movieId={movieId} />;
}

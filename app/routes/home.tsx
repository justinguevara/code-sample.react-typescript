import React from 'react';
import type { Route } from "./+types/home";
import Table from "~/components/table";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Code sample - page 1" },
  ];
}

const TABLE_PAGE_SIZE: number = 3;

export default function Home(): React.JSX.Element {
  return (
    <main>
      <Table pageSize={TABLE_PAGE_SIZE}/>
    </main>
  );
}

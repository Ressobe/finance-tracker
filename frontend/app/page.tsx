import { getCategory } from "@/server/category";

export default async function Home() {
  const { data, error } = await getCategory(7);
  if (error) return <div>djdj</div>;

  return <div>home page {data.currentBalance}</div>;
}

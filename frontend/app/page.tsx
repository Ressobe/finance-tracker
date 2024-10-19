import { LogoutButton } from "./_components/logout-button";

export default async function Home() {
  return (
    <div className="flex flex-col gap-2">
      home page <LogoutButton />{" "}
    </div>
  );
}

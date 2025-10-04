import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/auth";
import LogOutButton from "../(auth)/signout";

export default async function Dashboard() {
  return (
    <div className="p-8">
      <LogOutButton/>
    </div>
  );
}

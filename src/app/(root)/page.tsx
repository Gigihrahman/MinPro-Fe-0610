import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  return (
    <div>
      <div>ini halaman user</div>
      <p></p>
    </div>
  );
}

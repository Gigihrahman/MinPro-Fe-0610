import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  if (session.user.role === "USER") {
    return redirect("/");
  }
  if (session.user.role === "ADMIN") {
    return redirect("/organizer/dashboard");
  }

  return (
    <div>
      <div></div>
      <p></p>
    </div>
  );
}

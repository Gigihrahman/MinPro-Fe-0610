import LoginPage from "@/features/login";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await auth();
  if (session?.user.role) return redirect("/");
  return <LoginPage />;
};

export default Login;

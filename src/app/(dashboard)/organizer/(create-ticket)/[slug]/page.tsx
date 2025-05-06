import CreateSeatPage from "@/features/create-seat";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const CreateTicket = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth();
  if (!session) return redirect("/login");
  const slug = (await params).slug;
  return <CreateSeatPage slug={slug} />;
};

export default CreateTicket;

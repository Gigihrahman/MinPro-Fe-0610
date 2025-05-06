import UsingCodePage from "@/features/usingCode";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const detailPage = async ({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) => {
  const session = await auth();
  if (!session) return redirect("/login");
  const uuid = (await params).uuid;
  return <UsingCodePage uuid={uuid} />;
};

export default detailPage;

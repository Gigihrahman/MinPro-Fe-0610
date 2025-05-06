import UploadProofmentPage from "@/features/uploadProofment";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const uploadProofment = async ({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) => {
  const session = await auth();
  if (!session) return redirect("/login");
  const uuid = (await params).uuid;
  return <UploadProofmentPage uuid={uuid} />;
};

export default uploadProofment;

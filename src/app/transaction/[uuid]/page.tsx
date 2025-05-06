import OrderDetailPage from "@/features/order-detail";
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
  return <OrderDetailPage uuid={uuid} />;
};

export default detailPage;

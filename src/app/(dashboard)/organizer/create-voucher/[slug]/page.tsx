import CreateVoucherPage from "@/features/create-voucher";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const CreateVoucher = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth();
  if (!session) return redirect("/login");
  const slug = (await params).slug;
  return <CreateVoucherPage slug={slug} />;
};

export default CreateVoucher;

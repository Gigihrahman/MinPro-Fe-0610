import CreateVoucherPage from "@/features/create-voucher";
import React from "react";

const CreateVoucher = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  return <CreateVoucherPage slug={slug} />;
};

export default CreateVoucher;

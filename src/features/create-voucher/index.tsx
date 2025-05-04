"use client";
import { Button } from "@/components/ui/button";
import CreateVoucherForm from "@/features/create-voucher/components/CreateVoucherForm";
import useGetEventBySlug from "@/hooks/event/useGeteventBySlug";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface CreateVoucherPageProps {
  slug: string;
}
const CreateVoucherPage: FC<CreateVoucherPageProps> = ({ slug }) => {
  const { data: event, isPending } = useGetEventBySlug(slug);
  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        No event can create ticket
      </div>
    );
  }
  return (
    <div className="container mx-auto">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-800 text-white px-6 py-4">
        <Button
          variant="ghost"
          asChild
          className="text-indigo-200 hover:text-white hover:bg-indigo-800/30"
        >
          <Link
            href="/admin/vouchers"
            className="inline-flex items-center gap-2 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Kembali ke Daftar Voucher</span>
          </Link>
        </Button>
      </div>

      <CreateVoucherForm eventId={event.id} eventName={event.name} />
    </div>
  );
};

export default CreateVoucherPage;

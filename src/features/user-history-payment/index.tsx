"use client";
import TransactionHistoryUserList from "@/features/user-history-payment/components/TransactionHistoryUserList";
import useGetTransactionUser from "@/hooks/transaction/useGetTransactionUser";
import React from "react";

const UserHistoryPayment = () => {
  return (
    <div>
      <TransactionHistoryUserList />
    </div>
  );
};

export default UserHistoryPayment;

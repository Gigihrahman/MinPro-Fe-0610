export interface Transaction {
  id: number;
  uuid: string;
  userId: number;
  eventsId: number;
  voucher_amount: number | null;
  voucherId: number | null;
  coupoun_amount: number | null;
  couponId: number | null;
  usedPoint: number | null;
  status: string;
  totalPrice: number;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  pointsId: number | null;
  userEmail: string | null;

  event: {
    name: string;
  };

  voucher: {
    code: string;
  } | null;

  detailTransaction: {
    quantity: number;
  }[];

  points: {
    pointsValue: number;
  } | null;

  payments: {
    paymentMethod: string;
  }[];
}

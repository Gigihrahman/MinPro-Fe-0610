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
  userEmail: string;
  event: {
    name: string;
    locationDetail: string;
    startEvent: string;
    endEvent: string;
  };
  voucher: {
    code: string;
  } | null;
  detailTransaction: {
    quantity: number;
    seats: {
      name: string;
      price: number;
    };
  }[];
  points: {
    pointsValue: number;
  } | null;
  payments: {
    paymentMethod: string;
    paymentProofUrl: string;
    createdAt: string;
  }[];
}

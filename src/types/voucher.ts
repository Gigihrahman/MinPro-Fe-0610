export interface Voucher {
  id: number;
  organizerId: number;
  eventId: number;
  code: string;
  description: string;
  claimed: number;
  quota: number;
  value: number;
  validAt: string;
  expiredAt: string;
}

export enum OrderStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export type Order = {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: OrderStatus;
  companyName: string;
  services: string[];
  marketings: string[];
  createdAt: string;
  updatedAt: string;
};

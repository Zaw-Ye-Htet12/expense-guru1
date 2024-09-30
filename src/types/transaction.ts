export interface Transaction {
  _id: string;
  amount: number;
  type: string;
  categoryId: {
    name: string;
  };
  walletId: string;
  createdAt: string;
  updatedAt: string;
}

import { Transaction } from "@/types/transaction";
import { Categories } from "@/types/category";

// Placeholder data for Categories
export const categories: Categories[] = [
    { _id: 'cat1', name: 'Groceries' },
    { _id: 'cat2', name: 'Utilities' },
    { _id: 'cat3', name: 'Entertainment' },
    { _id: 'cat4', name: 'Transportation' },
  ];
  
  // Placeholder data for Transactions
  export const transactions: Transaction[] = [
    {
      _id: 'trans1',
      amount: 50.75,
      type: 'expense',
      category: {
        name: 'Groceries',
      },
      walletId: 'wallet1',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'trans2',
      amount: 120.5,
      type: 'expense',
      category: {
        name: 'Utilities',
      },
      walletId: 'wallet2',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'trans3',
      amount: 15.0,
      type: 'expense',
      category: {
        name: 'Entertainment',
      },
      walletId: 'wallet1',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'trans4',
      amount: 20.0,
      type: 'income',
      category: {
        name: 'Transportation',
      },
      walletId: 'wallet3',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'trans5',
      amount: 20.0,
      type: 'expense',
      category: {
        name: 'Transportation',
      },
      walletId: 'wallet3',
      createdAt: new Date().toISOString(),
    }, {
      _id: 'trans6',
      amount: 20.0,
      type: 'income',
      category: {
        name: 'Transportation',
      },
      walletId: 'wallet3',
      createdAt: new Date().toISOString(),
    },
  ];
  
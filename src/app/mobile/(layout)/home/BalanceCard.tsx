import TotalBalance from '@/components/common/totalBalance';
import TotalExpense from '@/components/common/totalExpense';
import { TotalIncome } from '@/components/common/totalIncome';
import Image from 'next/image';
import React from 'react'
import IncomeArrow from "../../../../../public/income-arrow.png";
import ExpenseArrow from "../../../../../public/expense-arrow.png";

const BalanceCard = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-[180px] w-[90%] rounded-xl p-3 bg-[#2f7e79] flex flex-col justify-between items-start">
        <div className="text-white">
          <span className="text-sm">Total balance</span>
          <span className="text-3xl">
            <TotalBalance className="font-semibold" />
          </span>
        </div>
        <div className="flex justify-between w-full poppins">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-300">Income</span>
              <Image src={IncomeArrow} alt="income show arrow" />
            </div>
            <TotalIncome className="text-xl font-semibold text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-300">Expense</span>
              <Image
                src={ExpenseArrow}
                alt="income show arrow"
                className="text-white"
              />
            </div>
            <TotalExpense className="text-xl font-semibold text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};


export default BalanceCard
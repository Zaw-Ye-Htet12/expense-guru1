import EmptyData from "@/components/common/emptyData";
// import FormattedTransactionAmount from "@/components/common/formattedTransactionAmount";
// import ListSkeleton from "@/components/common/listSkeleton";
import { Route } from "@/enums/route";
import { useTransaction } from "@/hooks/useTransaction";
import { Transaction } from "@/types/transaction";
import {transactions} from '@/utils/data'
import { getRelevantRoute } from "@/lib/route";
import dayjs from "dayjs";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import FormattedTransactionAmount from "@/components/common/formattedTransactionAmount";
import ListSkeleton from "@/components/common/listSkeleton";

const TransactionList = ({
  className,
  height,
}: {
  className?: string;
  height?: number;
}) => {
  const { transactions, isFetching } = useTransaction();
  return (
    <div
      className={`relative overflow-y-scroll w-full px-4 ${className} pb-[50px] h-full scrollbar-hide`}
      style={{ height: height + "px" }}
      id="scrollableDiv"
    >
      {isFetching ? (
        <ListSkeleton />
      ) : (
        <>
          {transactions.length > 0 ? (
            transactions.map((item: Transaction, index: number) => (
              <Link
                href={`${getRelevantRoute(Route.TRANSACTION)}/${item._id}`}
                key={`item-${index}-${item._id}`}
                className="flex justify-between w-full items-start border-b border-slate-100 my-1 py-2"
              >
                <div className="flex flex-col">
                  <div className="font-medium text-md">
                    {item.categoryId?.name || "Uncategorized"}
                  </div>
                  <div className="text-sm text-slate-400">
                    {dayjs(item.createdAt).format("MMMM D, YYYY")}
                  </div>
                </div>
                <FormattedTransactionAmount
                  amount={item.amount}
                  type={item.type}
                />
              </Link>
            ))
          ) : (
            <EmptyData dataName="transactions" />
          )}
        </>
      )}
    </div>
  );
};
export default TransactionList;
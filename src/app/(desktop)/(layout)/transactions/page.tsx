"use client"
import { TransactionForm } from "@/app/mobile/(layout)/add/page";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategory } from "@/hooks/useCategory";
import { useTransaction } from "@/hooks/useTransaction";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type Transaction = {
    _id: string,
    categoryId: { name: string } | null,
    walletId: string,
    amount: number,
    type: string,
    createdAt: string,
    updatedAt: string
}

export default function TransactionPage() {
    const { transactions, isFetching } = useTransaction();
    const [typeFilter, setTypeFilter] = useState<string>('');

    const columns: ColumnDef<Transaction>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => {
                        table.toggleAllPageRowsSelected(!!value);
                    }}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value);
                    }}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "amount",
            accessorKey: "amount",
            header: ({ column }) => {
                return (
                    <Button  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            filterFn: (row, columnId, filterValue) => {
                const amount = row.original.amount;
                return amount.toString().includes(filterValue);
            },
            cell:({row})=>{
                return <p className="text-left">
                    <span className={`${row.original.type === 'income' ? 'text-primary' : 'text-destructive'}`}>{row.original.amount} MMK</span> 
                </p>
            }
        },
        {
            accessorKey: "categoryId",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                        Category
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const categoryName = row.original.categoryId?.name || "Uncategorized"
                return <span>{categoryName}</span>
            },
            filterFn: (row, columnId, filterValue) => {
                const categoryName = row.original.categoryId?.name || "No Category";
                return categoryName.toLowerCase().includes(filterValue.toLowerCase());
            },
        },
        {
            accessorKey: "type",
            header: () => (
                <div className="flex items-center">
                  <span>Type</span>
                  <Select
                    onValueChange={(value) => {
                        setTypeFilter(value === 'all' ? '' : value);
                    }}
                    value={typeFilter || 'all'}
                    
                    >
                    <SelectTrigger className="ml-2 p-1 border rounded w-32">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
              ),
            cell:({row})=>{
                return <small className={`py-1 px-2 rounded-full text-xs text-white ${row.original.type==="income" ? 'bg-primary' : 'bg-destructive' }`}>{row.original.type}</small>
            },
            filterFn: (row, columnId, filterValue) => {
                return row.original.type.toLowerCase() === filterValue.toLowerCase();
              },
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => {
                return <span>{dayjs(row.original.createdAt).format("MMMM D, YYYY")}</span>
            }
        }
    ]

    return (
        <div className="h-full -z-10">
            <div className="w-full h-32 relative">
                <div className="z-50 absolute p-5 w-full">
                    <h1 className="text-2xl font-semibold mb-5">Transactions</h1>
                    <Link href="/transactions/create">
                        <Button>Add New Transaction</Button>
                    </Link>
                    <DataTable
                        data={transactions.filter((transaction) => {
                        return typeFilter ? transaction.type.toLowerCase() === typeFilter.toLowerCase() : true;
                        })}
                        isLoading={isFetching}
                        columns={columns}
                        filterableColumns={['amount', 'categoryId']}
                    />
                </div>
            </div>
        </div>
    )
}
"use client"
import { DataTable } from "@/components/common/data-table";
import { DatePickerWithRange } from "@/components/common/datePicker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTransaction } from "@/hooks/useTransaction";
import { ColumnDef } from "@tanstack/react-table";
import { endOfDay } from "date-fns";
import { TransactionForm } from "@/app/mobile/(layout)/add/page";
import TransactionDialogBox from "@/components/desktop/transactions/transactionDialogBox";
import dayjs from "dayjs";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

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
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>();

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesType = typeFilter ? transaction.type.toLowerCase() === typeFilter.toLowerCase() : true;
        const transactionDate = new Date(transaction.createdAt);
        const matchesDateRange =
            selectedDateRange?.from && selectedDateRange?.to
                ? transactionDate >= selectedDateRange.from && transactionDate <= endOfDay(selectedDateRange.to)
                : true;
        return matchesType && matchesDateRange
    })

    const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>();
    const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState<boolean>(false);

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
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            filterFn: (row, columnId, filterValue) => {
                const amount = row.original.amount;
                return amount.toString().includes(filterValue);
            },
            cell: ({ row }) => {
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
                        <SelectTrigger className="ml-2 border rounded w-32">
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
            cell: ({ row }) => {
                return <small className={`py-1 px-2 rounded-full text-xs text-white ${row.original.type === "income" ? 'bg-primary' : 'bg-destructive'}`}>{row.original.type}</small>
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
        },
        {
            id: "Action",
            header: "Action",
            cell: ({ row }) => {
                return <Button onClick={() => openTransactionDialog(row.original)}>View</Button>
            }
        }
    ]

    const openTransactionDialog = (transaction: Transaction) => {
        setCurrentTransaction(transaction);
        setIsTransactionDialogOpen(true);
    }
    const transactionParams = { id: currentTransaction?._id || "" };

    const exportTransaction = async () => {
        try {
            const dataToExcel = transactions.map((transaction) => ({
                ID: transaction._id,
                Amount: transaction.amount,
                Category: transaction.categoryId?.name || "Uncategorized",
                Type: transaction.type,
                CreatedAt: new Date(transaction.createdAt).toLocaleDateString(),
            }));
            const worksheet = XLSX.utils.json_to_sheet(dataToExcel);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
            const excelBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
            const data = new Blob([excelBuffer], { type: "application/octet-stream" });
            saveAs(data, "Transactions.xlsx")
        } catch (err: any) {
            console.log(err)
        }
    }
    return (
        <div className="h-full -z-10">
            <div className="w-full h-32 relative">
                <div className="z-50 absolute p-5 w-full">
                    <h1 className="text-2xl font-semibold mb-5">Transactions</h1>
                    {isTransactionDialogOpen && currentTransaction && (
                        <TransactionDialogBox isOpen={isTransactionDialogOpen} setIsOpen={setIsTransactionDialogOpen} params={transactionParams} />
                    )}
                    <Link href="/transactions/create">
                        <Button>Add New Transaction</Button>
                    </Link>
                    <Button className="ms-2" onClick={() => exportTransaction()}>Export</Button>
                    <DataTable
                        key={transactions.length}
                        dataName="transactions"
                        data={filteredTransactions}
                        isLoading={isFetching}
                        columns={columns}
                        filterableColumns={['amount', 'categoryId']}
                        dateRangeComponent={
                            <DatePickerWithRange selectedDateRange={selectedDateRange} onDateChange={setSelectedDateRange} />
                        }
                    />
                </div>
            </div>
        </div>
    )
}
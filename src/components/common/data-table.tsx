"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { CategoryType } from "@/validations/category/create";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "@/components/ui/button"
import { DataTablePagination } from "./data-table-pagination"
import Link from "next/link"
import CategoryDialogBox from "../mobile/category/categoryDialogBox"
import { useCategory } from "@/hooks/useCategory"
import EmptyData from "./emptyData";
import ListSkeleton from "./listSkeleton";


interface DataTableProps<TData, TValue> {
  columns: any,
  data: TData[],
  isLoading: boolean,
  filterableColumns:string[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  filterableColumns   
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection,setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange:setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting, columnFilters,rowSelection }
  });                     

  return (
    <div>
      <div className="flex items-center py-4 gap-1">
      {filterableColumns.map((columnKey) => (
          <Input
            key={columnKey}
            placeholder={`Filter by ${columnKey==="categoryId" ? 'category' : columnKey}...`}
            value={(table.getColumn(columnKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(columnKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ))}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <ListSkeleton />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <EmptyData dataName="categories" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-3">
        <DataTablePagination table={table}/>
      </div>
    </div>

  )
}

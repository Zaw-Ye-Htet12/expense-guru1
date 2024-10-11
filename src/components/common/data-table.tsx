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
import EmptyData from "./emptyData";
import ListSkeleton from "./listSkeleton";
import { DatePickerWithRange } from "./datePicker";


interface DataTableProps<TData, TValue> {
  columns: any,
  data: TData[],
  isLoading: boolean,
  filterableColumns:string[],
  dateRangeComponent?:React.ReactNode,
  dataName:string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  filterableColumns,
  dateRangeComponent,
  dataName
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
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-1">
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
        {dateRangeComponent && (
          <div>
            {dateRangeComponent}
          </div>
        )}
      </div>
      <div className="rounded-md border">
        <Table >
          <TableHeader className="h-12">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-12 border-b ">
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
              table.getRowModel().rows.map((row,index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 h-11`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-b ">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <EmptyData dataName={dataName} />
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

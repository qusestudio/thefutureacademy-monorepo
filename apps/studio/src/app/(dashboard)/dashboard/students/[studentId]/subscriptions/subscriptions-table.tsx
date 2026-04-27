"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Button } from "@workspace/ui/components/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import React from "react"
import { Input } from "@workspace/ui/components/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function SubscriptionsTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    },
  })

  return (
    <div className="flex flex-col space-y-2">
      {/*<div className="flex max-w-sm items-center border-2 rounded-sm p-2">*/}
      {/*  <input*/}
      {/*    placeholder="Filter emails..."*/}
      {/*    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}*/}
      {/*    onChange={(event) =>*/}
      {/*      table.getColumn("email")?.setFilterValue(event.target.value)*/}
      {/*    }*/}
      {/*    className="font-geist-sans w-full outline-none text-sm"*/}
      {/*  />*/}
      {/*  <HugeiconsIcon icon={Search01Icon} size={20} />*/}
      {/*</div>*/}
      <div className="overflow-hidden rounded-md border">
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-xs">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <button
          className="cursor-pointer rounded-full p-2 hover:bg-accent"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <HugeiconsIcon size={30} icon={ArrowLeft02Icon} />
        </button>
        <button
          className="cursor-pointer rounded-full p-2 hover:bg-accent"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <HugeiconsIcon size={30} icon={ArrowRight02Icon} />
        </button>
      </div>
    </div>
  )
}

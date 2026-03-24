"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { ShieldAlertIcon } from "lucide-react";

export type DataTableColumn<T> = {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

type Props<T> = {
  title?: ReactNode;
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  filtersSlot?: ReactNode;
  actionsSlot?: ReactNode;
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyState?: ReactNode;
  pagination?: {
    page: number;
    onChange: (page: number) => void;
    pageSize?: number;
  };
  className?: string;
};

export function DataTable<T>({
  title,
  search,
  filtersSlot,
  actionsSlot,
  columns,
  rows,
  getRowKey,
  emptyState,
  pagination,
  className,
}: Props<T>) {
  const pageSize = pagination?.pageSize ?? 5;
  const totalRows = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const currentPage = pagination ? Math.min(Math.max(1, pagination.page), totalPages) : 1;
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(totalRows, startIdx + pageSize);
  const visibleRows = pagination ? rows.slice(startIdx, endIdx) : rows;

  return (
    <Card className={cn("rounded-2xl p-5", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="text-lg font-semibold">{title}</div>
        <div className="ml-auto flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          {search ? (
            <Input
              value={search.value ?? ""}
              onChange={(e) => search.onChange(e.target.value)}
              placeholder={search.placeholder ?? "Search..."}
              className="w-full sm:w-[260px] rounded-full"
            />
          ) : null}
          {filtersSlot ? <div className="flex items-center gap-2">{filtersSlot}</div> : null}
          {actionsSlot ? <div className="flex items-center gap-2">{actionsSlot}</div> : null}
        </div>
      </div>

      <div className="mt-3">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((c) => (
                <TableHead key={c.id} className={c.headerClassName}>
                  {c.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleRows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="py-10">
                  {emptyState ?? (
                    <div className="flex flex-col justify-center items-center gap-y-3">
                      <ShieldAlertIcon className="w-16 h-16 text-red-500" />
                      <div className="text-sm text-muted-foreground">No data</div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              visibleRows.map((row) => (
                <TableRow key={getRowKey(row)}>
                  {columns.map((c) => (
                    <TableCell key={c.id} className={c.cellClassName}>
                      {c.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && totalRows > 0 ? (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="text-sm text-muted-foreground">
            Showing {startIdx + 1}-{endIdx} of {totalRows}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              disabled={currentPage <= 1}
              onClick={() => pagination.onChange(currentPage - 1)}
            >
              Prev
            </Button>
            <div className="text-sm text-muted-foreground">
              Page {currentPage} / {totalPages}
            </div>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              disabled={currentPage >= totalPages}
              onClick={() => pagination.onChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </Card>
  );
}

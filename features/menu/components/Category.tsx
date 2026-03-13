"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { MenuCategory } from "@/features/menu/types/MenuCategory";
import { dataCategories } from "../services/data/category-menu";

export default function Category({
    categories,
    value,
    defaultValue,
    onChange,
}: {
    categories?: MenuCategory[];
    value?: string;
    defaultValue?: string;
    onChange?: (categoryId: string) => void;
}) {
    // Add default category if not provided
    const defaultCategories = useMemo<MenuCategory[]>(
        () => [
            ...dataCategories,
        ],
        []
    );
    // Add default category if not provided
    const list = categories ?? defaultCategories;
    // Add default category if not provided
    const [internal, setInternal] = useState<string>(defaultValue ?? list[0]?.id ?? "all");
    // Add default category if not provided
    const activeId = value ?? internal;
    // Add default category if not provided
    const select = (id: string) => {
        if (value === undefined) setInternal(id);
        onChange?.(id);
    };

    return (
        <div className="w-full flex flex-col gap-3 pt-2">
            <div className="flex w-full gap-3 overflow-x-auto pb-2">
                {list.map((c) => {
                    const active = c.id === activeId;
                    const Icon = c.icon;
                    return (
                        <button
                            key={c.id}
                            type="button"
                            onClick={() => select(c.id)}
                            className={cn(
                                "flex min-w-[190px] items-center gap-4 rounded-2xl border px-4 py-3 text-left",
                                active
                                    ? "border-emerald-600 bg-emerald-600 text-white"
                                    : "border-border bg-background text-foreground"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex h-12 w-12 items-center justify-center rounded-2xl",
                                    active ? "bg-white/15" : "bg-muted"
                                )}
                            >
                                {Icon ? (
                                    <Icon className={cn("h-7 w-7", active ? "text-white" : "text-muted-foreground")} />
                                ) : (
                                    <span className={cn("text-lg font-semibold", active ? "text-white" : "text-muted-foreground")}>
                                        {c.label.slice(0, 1).toUpperCase()}
                                    </span>
                                )}
                            </div>

                            <div className="min-w-0">
                                <div className={cn("truncate text-base font-semibold", active ? "text-white" : "text-foreground")}>
                                    {c.label}
                                </div>
                                <div className={cn("text-sm", active ? "text-white/90" : "text-muted-foreground")}>
                                    {c.itemsCount} items
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { getInitials } from "@/lib/name";
import { MenuProduct } from "@/features/menu/types/MenuProduct";

export default function ProductCard({
    id,
    name,
    description,
    priceMin,
    priceMax,
    imageUrl,
    available,
    onAdd,
    className,
}: MenuProduct) {
    const [qty, setQty] = useState(0);

    const add = () => {
        const next = qty + 1;
        setQty(next);
        onAdd?.(id, next);
    };
    const inc = () => {
        const next = qty + 1;
        setQty(next);
        onAdd?.(id, next);
    };
    const dec = () => {
        const next = Math.max(0, qty - 1);
        setQty(next);
        onAdd?.(id, next);
    };

    return (
        <div className={cn("w-full max-w-full rounded-2xl border border-border p-3", className)}>
            <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-muted">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 360px"
                        className="object-cover"
                    />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-emerald-700">
                    {getInitials(name)}
                </div>
                <div className="absolute right-2 top-2">
                    <span
                        className={cn(
                            "inline-flex items-center gap-2 rounded-2xl px-3 py-1 text-xs font-medium",
                            available ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"
                        )}
                    >
                        <span
                            className={cn(
                                "h-2 w-2 rounded-full",
                                available ? "bg-emerald-600" : "bg-muted-foreground"
                            )}
                        />
                        {available ? "Available" : "Sold"}
                    </span>
                </div>
            </div>

            <div className="mt-3">
                <div className="truncate text-base font-semibold">{name}</div>
                <div className="line-clamp-2 text-sm text-muted-foreground">{description}</div>
            </div>

            <div className="mt-3 flex items-center justify-between">
                <div className={cn("text-base font-semibold", available ? "text-emerald-600" : "text-muted-foreground")}>
                    ${priceMin} - ${priceMax}
                </div>
                {available ? (
                    qty === 0 ? (
                        <button
                            type="button"
                            onClick={add}
                            className="rounded-2xl border border-emerald-600 px-6 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                        >
                            Add
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={dec}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                                aria-label="Decrease"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-6 text-center font-semibold text-emerald-700">{qty}</span>
                            <button
                                type="button"
                                onClick={inc}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                                aria-label="Increase"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    )
                ) : (
                    <button
                        type="button"
                        disabled
                        className="cursor-not-allowed rounded-2xl bg-muted px-6 py-2 text-sm font-medium text-muted-foreground"
                    >
                        Add
                    </button>
                )}
            </div>
        </div>
    );
}

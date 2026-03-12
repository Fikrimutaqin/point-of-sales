"use client";

import { useState } from "react";
import SwitcherButton from "@/shared/components/switcher-button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import ItemListDetail from "./ItemListDetail";
import { initialItems } from "@/features/order-detail/services/data/product-items";
import PaymentSummary from "./PaymentSummary";

export default function OrderDetailSection() {
  // State active button
  const [activeButton, setActiveButton] = useState("Dine in");

  return (
    // Wrapper section order detail
    <div className="w-full flex flex-col gap-y-3">
      {/* Header order detail */}
      <div className="w-full flex flex-row justify-between items-center gap-x-3">
        <div className="text-base font-semibold">Order Details</div>
        <p className="text-sm text-gray-600">#045</p>
      </div>

      {/* Switcher button to choose dine in or take away */}
      {SwitcherButton({ buttons: ["Dine in", "Take Away"] }, activeButton, setActiveButton)}

      {/* Customer name and choice number table is available*/}
      <div className="flex flex-row gap-x-3 justify-between">
        {/* Card customer */}
        <Card className="mx-auto w-full max-w-sm">
          <CardContent className="w-full flex flex-col justify-start items-start p-2! gap-y-2">
            <p className="text-muted-foreground text-sm">Customer Name</p>
            <Input placeholder="Enter customer name" />
          </CardContent>
        </Card>
        {/* Card choice number */}
        <Card className="mx-auto w-full max-w-sm">
          <CardContent className="w-full flex flex-col justify-start items-start p-2! gap-y-2">
           <p className="text-muted-foreground text-sm">Table Number</p>
           <Button className="bg-emerald-600 rounded-full! text-xs text-white hover:bg-emerald-700">Choice Table Number</Button>
          </CardContent>
        </Card>
      </div>
      {/* Item list detail */}
      <ItemListDetail initialItems={initialItems} />
      {/* Payment summary */}
      <PaymentSummary />
    </div>
  );
}

"use client";

import { useState } from "react";
import SwitcherButton from "@/shared/components/switcher-button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import ItemListDetail from "./ItemListDetail";
import { initialItems } from "@/features/order-detail/services/data/product-items";
import PaymentSummary from "./PaymentSummary";
import PaymentMethod from "./PaymentMethod";

export default function OrderDetailSection() {
  // State active button
  const [activeButton, setActiveButton] = useState("Dine in");

  return (
    // Wrapper section order detail
    <div className="w-full flex flex-col gap-y-3">
      {/* Header order detail */}
      <div className="w-full flex flex-row justify-between items-center gap-x-3">
        <div className="text-lg font-semibold">Order Details</div>
        <p className="text-base text-gray-600">#045</p>
      </div>

      {/* Switcher button to choose dine in or take away */}
      {SwitcherButton({ buttons: ["Dine in", "Take Away"] }, activeButton, setActiveButton)}

      {/* Customer name and choice number table is available*/}
      <div className="flex flex-col lg:flex-row gap-x-3 justify-between gap-y-2">
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
      <PaymentSummary order={{
        subTotal: 1000,
        tax: 100,
        discountType: 'percentage',
        discountValue: 10,
        feeApplication: 10,
        total: 1100,
      }} />
      {/* Choice payment method */}
      <div className="w-full flex flex-col justify-between items-center gap-x-3 gap-y-3">
        <div className="text-lg font-semibold text-white text-left w-full">Payment Method</div>
        <PaymentMethod className="w-full" />
      </div>
      {/* Button confirm order */}
      <div className="w-full my-5">
        <Button className="w-full rounded-full! bg-emerald-600 text-white hover:bg-emerald-700">Confirm Order</Button>
      </div>
    </div>
  );
}

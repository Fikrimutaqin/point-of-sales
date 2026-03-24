import MenuSection from "@/features/menu/components/MenuSection";
import OrderDetailSection from "@/features/order-detail/components/OrderDetailSection";
import OrderQueueSection from "@/features/order/components/OrderQueueSection";

export default function POSPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-x-5 gap-y-3 lg:gap-y-0 w-full">
      <div className="space-y-4 w-full lg:w-[70%]">
        {/* Menu */}
        <div className="w-full flex flex-col">
          <MenuSection />
        </div>
      </div>

      <div className="w-full lg:w-[30%]">
        <div className="min-h-0 rounded-2xl p-4 border border-border w-auto overflow-y-scroll">
          <OrderDetailSection />
        </div>
      </div>
    </div>
  );
}

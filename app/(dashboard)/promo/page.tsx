import PromoSection from "@/features/promo/components/PromoSection";
import ManagePromoSection from "@/features/promo/components/ManagePromoSection";

export default function PromoPage() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Promo</h2>
      </div>
      <PromoSection />
      <ManagePromoSection />
    </div>
  );
}

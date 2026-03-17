"use client";

import { FilterIcon, SearchIcon } from "lucide-react";
import Category from "./Category";
import ProductCard from "./Product";
import { dataProducts } from "../services/data/product-menu";

export default function MenuSection() {
  return (
    <div className="w-full flex flex-col">
      {/* Headline and search, filter */}
      <div className="flex flex-row justify-between items-center w-full">
        <div className="text-lg font-semibold">Menu</div>

        {/* Search and Filter*/}
        <div className="w-full flex justify-end items-center gap-x-3">
          <div className="w-10 h-10 rounded-full border border-border flex justify-center items-center cursor-pointer">
            <SearchIcon className="w-5 h-5" />
          </div>

          <div className="w-10 h-10 rounded-full border border-border flex justify-center items-center cursor-pointer">
            <FilterIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Category */}
      <Category />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-3">
        {dataProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            priceMin={product.priceMin}
            priceMax={product.priceMax}
            imageUrl={`https://example.com/${product.category}.jpg`}
            available={true}
            onAdd={(id, qty) => console.log(id, qty)}
          />
        ))}
      </div>
    </div>
  );
}

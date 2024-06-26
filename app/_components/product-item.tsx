"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface ProductItemProp {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProp) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className={cn("w-[150px] min-w-[150px]", className)}
    >
      <div className="w-full space-y-2">
        {/**IMAGEM */}
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
          {product.discountPercentage && (
            <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
              <ArrowDown size={12} />
              <span className="text-xs font-semibold ">
                {product.discountPercentage}%
              </span>
            </div>
          )}
        </div>
        {/**TITULO PREÇO E RESTAURANTE */}
        <div>
          <h2 className="truncate text-sm">{product.name}</h2>
        </div>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold">
            {formatCurrency(Number(calculateProductTotalPrice(product)))}
          </h3>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>
        <span className="block text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
    </Link>
  );
};

export default ProductItem;

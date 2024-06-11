"use client";

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";

interface CartBannerProp {
  restaurant: Pick<Restaurant, "id">;
}

const CartBanner = ({ restaurant }: CartBannerProp) => {
  const { products, totalPrice, totalQuantity } = useContext(CartContext);
  const deliveryFee = products[0]?.restaurant?.deliveryFee;
  const noDeliveryPrice = Number(totalPrice) + Number(deliveryFee);
  const [showCart, setShowCart] = useState(false);

  const handleSetShowCart = () => {
    setShowCart(true);
  };
  const restaurantHasProductsOnCart = products.some(
    (products) => products.RestaurantId === restaurant.id,
  );

  if (!restaurantHasProductsOnCart) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 w-full bg-white p-5 pt-3">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xs text-muted-foreground">Seu pedido</h1>
            <h3 className="font-semibold">
              {formatCurrency(noDeliveryPrice)}{" "}
              <span className="text-xs text-muted-foreground">
                {" "}
                / {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
              </span>
            </h3>
          </div>

          <div className="h-3">
            <Button
              className="w-full font-semibold"
              onClick={handleSetShowCart}
            >
              <ShoppingCart size={18} />
              Ver sacola
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={showCart} onOpenChange={setShowCart}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setShowCart} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartBanner;

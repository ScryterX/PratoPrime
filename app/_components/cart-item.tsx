import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProp {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProp) => {
  const {
    decreaseProductQuantityInCart,
    increaseProductQuantityInCart,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () =>
    decreaseProductQuantityInCart(cartProduct.id);
  const handleIncreaseQuantityClick = () =>
    increaseProductQuantityInCart(cartProduct.id);
  const handleRemoveFromCartClick = () => removeProductFromCart(cartProduct.id);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="mb-5 flex items-center gap-4">
          <div className="relative h-20 w-20">
            <Image
              src={cartProduct.imageUrl}
              alt={cartProduct.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="space-y-1">
            <h3 className="text-xs">{cartProduct.name}</h3>

            <div className="flex items-center gap-1">
              <h4 className="text-sm font-semibold">
                {formatCurrency(
                  calculateProductTotalPrice(cartProduct) *
                    cartProduct.quantity,
                )}
              </h4>
              <h4 className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </h4>
            </div>

            <div className="flex items-center text-center">
              <Button
                size={"icon"}
                variant={"ghost"}
                className="h-7 w-7 border border-solid border-muted-foreground"
                onClick={handleDecreaseQuantityClick}
              >
                <ChevronLeftIcon
                  size={18}
                  //  onClick={handleDecreaseQuantityClick}
                />
              </Button>
              <span className="block w-8 text-xs">{cartProduct.quantity}</span>
              <Button
                size={"icon"}
                variant={"ghost"}
                className="h-7 w-7 border border-solid border-muted-foreground"
                onClick={handleIncreaseQuantityClick}
              >
                <ChevronRightIcon size={18} />
              </Button>
            </div>
          </div>
        </div>

        <Button
          size={"icon"}
          variant={"ghost"}
          className="h-7 w-7 border border-solid border-muted-foreground"
          onClick={handleRemoveFromCartClick}
        >
          <TrashIcon size={18} />
        </Button>
      </div>
    </>
  );
};

export default CartItem;

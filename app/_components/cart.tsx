import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ShoppingBagIcon } from "lucide-react";

const Cart = () => {
  const { products, subtotalPrice, totalPrice, totalDiscounts } =
    useContext(CartContext);
  const deliveryFee = products[0]?.restaurant?.deliveryFee;
  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className="flex-auto space-y-4">
              {products.map((product) => (
                <CartItem key={product.id} cartProduct={product} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex-auto space-y-4">
              <span>Você não adicionou produtos ao carrinho</span>
            </div>
          </>
        )}

        <div className="mt-6">
          <Card>
            <CardContent className="space-y-2 p-5">
              <div className="flex items-center justify-between text-xs">
                <span className=" text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotalPrice)}</span>
              </div>

              <Separator className="bg-[#EEEEEE]" />

              <div className="flex items-center justify-between text-xs">
                <span className=" text-muted-foreground">Descontos</span>
                <span>
                  {products[0]?.restaurant?.deliveryFee !== undefined ? (
                    <span className="text-green-500">
                      -{formatCurrency(totalDiscounts)}
                    </span>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>

              <Separator className="bg-[#EEEEEE]" />

              <div className="flex items-center justify-between text-xs">
                <span className=" text-muted-foreground">Entrega</span>
                <span>
                  {deliveryFee !== undefined && Number(deliveryFee) === 0 ? (
                    <span className="uppercase text-primary">Grátis</span>
                  ) : deliveryFee !== undefined ? (
                    formatCurrency(Number(deliveryFee))
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>

              <Separator className="bg-[#EEEEEE]" />

              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="">Total</span>
                <span>
                  {products[0]?.restaurant?.deliveryFee != undefined
                    ? formatCurrency(totalPrice)
                    : "R$ 0,00"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {products.length > 0 ? (
          <>
            <div className="mt-6">
              <Button className="w-full gap-2">
                <ShoppingBagIcon />
                Finalizar pedido
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-6">
              <Button disabled className="w-full gap-2" variant={"secondary"}>
                <ShoppingBagIcon />
                Selecione um produto para continuar
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;

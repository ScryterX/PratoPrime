import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Loader2, ShoppingBagIcon } from "lucide-react";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface CartProps {
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
}
const Cart = ({ setIsOpen }: CartProps) => {
  const router = useRouter();
  const { products, subtotalPrice, totalPrice, totalDiscounts, clearCart } =
    useContext(CartContext);
  const deliveryFee = products[0]?.restaurant?.deliveryFee;
  const { data } = useSession();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setisConfirmDialogOpen] = useState(false);

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;
    const restaurant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);
      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee, // TODO: get delivery fee from restaurant
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data?.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              ProductId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });
      clearCart();
      setIsOpen(false);

      toast("Pedido finalizado com sucesso!", {
        description: "Você pode acompanhá-lo na página de pedidos",
        action: {
          label: "Ver mais",
          onClick: () => router.push("/orders"),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };
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
          isSubmitLoading ? (
            <>
              <div className="mt-6">
                <Button disabled className="w-full gap-2">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <ShoppingBagIcon />
                  Finalizar pedido
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="mt-6">
                <Button
                  className="w-full gap-2"
                  onClick={() => setisConfirmDialogOpen(true)}
                >
                  <ShoppingBagIcon />
                  Finalizar pedido
                </Button>
              </div>
            </>
          )
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

        <AlertDialog
          open={isConfirmDialogOpen}
          onOpenChange={setisConfirmDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
              <AlertDialogDescription>
                Ao finalizar seu pedido, você concorda com os termos e condições
                da nossa plataforma.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleFinishOrderClick}>
                Finalizar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Cart;

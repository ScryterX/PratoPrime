/* eslint-disable no-unused-vars */
"use client";

import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true;
          deliveryFee: true;
          deliveryTimeMinutes: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface iCartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalDiscounts: number;
  totalQuantity: number;
  // eslint-disable-next-line no-unused-vars
  addProductToCart: ({
    product,
    emptyCart,
  }: {
    product: CartProduct;
    emptyCart?: boolean;
  }) => void;
  decreaseProductQuantityInCart: (productId: string) => void;
  increaseProductQuantityInCart: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<iCartContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  totalQuantity: 0,
  addProductToCart: () => {},
  decreaseProductQuantityInCart: () => {},
  increaseProductQuantityInCart: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subtotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalQuantity = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return (
      products.reduce((acc, product) => {
        return acc + calculateProductTotalPrice(product) * product.quantity;
      }, 0) + Number(products?.[0]?.restaurant?.deliveryFee)
    );
  }, [products]);

  const totalDiscounts =
    subtotalPrice - totalPrice + Number(products?.[0]?.restaurant?.deliveryFee);

  const clearCart = () => {
    return setProducts([]);
  };
  const decreaseProductQuantityInCart = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) return cartProduct;
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }
        return cartProduct;
      }),
    );
    return;
  };

  const increaseProductQuantityInCart = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      }),
    );
    return;
  };

  const removeProductFromCart = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    );
  };

  const addProductToCart: iCartContext["addProductToCart"] = ({
    product,
    emptyCart,
  }) => {
    //Caso receba emptyCart, limpa o carrinho
    if (emptyCart) {
      setProducts([]);
    }

    //Verificar se o produto já está no carrinho
    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    //Se houver a tentativa de adicionar um produto que já esteja no carrinho, soma à quantidade pré-existente
    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );
      return;
    }

    setProducts((prev) => [
      ...prev,
      { ...product, quantity: product.quantity },
    ]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        subtotalPrice,
        totalPrice,
        totalDiscounts,
        totalQuantity,
        clearCart,
        addProductToCart,
        decreaseProductQuantityInCart,
        increaseProductQuantityInCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import { Prisma } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface RestaurantDetailsProp {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: {
        include: {
          products: {
            include: {
              restaurant: {
                select: {
                  name: true;
                };
              };
            };
          };
        };
      };
      Product: {
        take: 10;
        include: {
          restaurant: {
            select: {
              name: true;
            };
          };
        };
      };
    };
  }>;
}
const RestaurantDetails = ({ restaurant }: RestaurantDetailsProp) => {
  return (
    <>
      <div className="relative mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white p-5 pt-6">
        <div className="flex items-center gap-[0.375rem] px-5">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>
        <div className="flex items-center gap-[2px] rounded-full bg-foreground px-2 py-[2px] text-white">
          <StarIcon size={14} className="fill-yellow-400 text-yellow-500" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>
      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            className="min-w-[167px] gap-4 rounded-lg bg-[#f4f4f4] text-center"
            key={category.id}
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4 ">
        <h2 className="px-5 font-semibold">Mais pedidos</h2>
        {/**TODO: mostrar produtos mais pedidos quando implementar realização de pedido*/}
        <ProductList products={restaurant.Product} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4 " key={category.id}>
          <h2 className="px-5 font-semibold">{category.name}</h2>
          {/**TODO: mostrar produtos mais pedidos quando implementar realização de pedido*/}
          <ProductList products={category.products} />
        </div>
      ))}
    </>
  );
};

export default RestaurantDetails;

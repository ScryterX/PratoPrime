import { notFound } from "next/navigation";
import { db } from "../../_lib/prisma";
import RestaurantImage from "./_components/restaurant-image";
import RestaurantDetails from "./_components/restaurant-details";

interface RestaurantPageProp {
  params: {
    id: string;
  };
}
const RestaurantPage = async ({ params }: RestaurantPageProp) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: params.id,
    },
    include: {
      categories: {
        include: {
          products: {
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      Product: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) return notFound();

  return (
    <div className="">
      <RestaurantImage restaurant={restaurant} />
      <RestaurantDetails restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
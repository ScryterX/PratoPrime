import Header from "@/app/_components/Header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";

const RecommendedRestaurants = async () => {
  const session = await getServerSession(authOptions);
  const restaurants = await db.restaurant.findMany({});
  const userFavorites = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user?.id },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className=" flex w-full flex-col gap-4 ">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              className="min-w-full max-w-full"
              key={restaurant.id}
              restaurant={restaurant}
              userFavoriteRestaurants={userFavorites}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurants;

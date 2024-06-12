import { Suspense } from "react";
import RestaurantSearch from "../_components/restaurants";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";

const RestaurantPage = async () => {
  const session = await getServerSession(authOptions);
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <Suspense>
      <RestaurantSearch userFavoriteRestaurants={userFavoriteRestaurants} />;
    </Suspense>
  );
};

export default RestaurantPage;

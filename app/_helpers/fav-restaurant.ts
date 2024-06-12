import { UserFavoriteRestaurant } from "@prisma/client";

export const isRestaurantFavorited = (
  restaurantId: string,
  userFavoriteRestaurants: UserFavoriteRestaurant[],
): boolean => {
  return userFavoriteRestaurants.some(
    (fav) => fav.restaurantId === restaurantId,
  );
};

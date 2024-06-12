"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurant } from "../_actions/search";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import Header from "@/app/_components/Header";
import RestaurantItem from "@/app/_components/restaurant-item";
interface RestaurantSearchProp {
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}
const RestaurantSearch = ({
  userFavoriteRestaurants,
}: RestaurantSearchProp) => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchFor = searchParams.get("q");
  useEffect(() => {
    const fetchRestaurants = async () => {
      const searchFor = searchParams.get("q");
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurant(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchParams]);
  if (!searchFor) return notFound();
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>
        <div className=" flex w-full flex-col gap-4 ">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              className="min-w-full max-w-full"
              key={restaurant.id}
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantSearch;

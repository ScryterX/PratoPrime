import Header from "@/app/_components/Header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { Button } from "@/app/_components/ui/button";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { TrendingUpIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return notFound();

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div className=" flex w-full flex-col gap-4 ">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                className="min-w-full max-w-full"
                key={restaurant.id}
                restaurant={restaurant}
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <div className="justify-center text-center">
              <h3 className="font-bold">
                Ops! parece que você ainda não adicionou nenhum restaurante aos
                favoritos.
              </h3>
              <h4>Que tal experimentar algo novo e adicionar aqui?</h4>
              <div className="mt-6">
                <Button className="w-full gap-1 font-semibold" asChild>
                  <Link href="/restaurants/recommended">
                    <TrendingUpIcon /> Restaurantes recomendados
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;

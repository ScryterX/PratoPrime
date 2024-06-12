import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { UserFavoriteRestaurant } from "@prisma/client";
import { useRouter } from "next/navigation";

interface useToggleFavoriteRestaurantProp {
  userId?: string;
  useFavoriteRestaurants?: UserFavoriteRestaurant[];
  restaurantId: string;
  restaurantIsFavorited?: boolean;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorited,
}: useToggleFavoriteRestaurantProp) => {
  const router = useRouter();
  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      await toggleFavoriteRestaurant(userId, restaurantId);
      return toast.success(
        restaurantIsFavorited
          ? "Restaurante removido dos favoritos."
          : "Restaurante favoritado com sucesso!",
        {
          action: {
            label: "Ver favoritos",
            onClick: () => {
              router.push("/restaurants/favorites");
            },
          },
        },
      );
    } catch (error) {
      toast.error("Erro ao favoritar restaurante");
    }
  };
  return handleFavoriteClick;
};

export default useToggleFavoriteRestaurant;

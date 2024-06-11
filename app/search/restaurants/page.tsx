import { Suspense } from "react";
import RestaurantSearch from "../_components/restaurants";

const RestaurantPage = () => {
  return (
    <Suspense>
      <RestaurantSearch />;
    </Suspense>
  );
};

export default RestaurantPage;

import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProp {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProp) => {
  return (
    <Card className="mt-6 flex justify-around px-5 py-3">
      {/**VALOR FRETE*/}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <BikeIcon size={14} />
        </div>
        {Number(restaurant.deliveryFee) > 0 ? (
          <p className="text-xs font-semibold">
            {formatCurrency(Number(restaurant.deliveryFee))}
          </p>
        ) : (
          <p className="text-sm font-semibold">Grátis</p>
        )}
      </div>
      {/**TEMPO */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-xs">TEMPO</span>
          <TimerIcon size={14} />
        </div>

        <p className="text-xs font-semibold">
          {restaurant.deliveryTimeMinutes} min
        </p>
      </div>
    </Card>
  );
};

export default DeliveryInfo;

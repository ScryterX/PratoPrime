import CategoryList from "./_components/Category-list";
import Header from "./_components/Header";
import Search from "./_components/Search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="pt-6">
        <CategoryList />
      </div>

      <div className="px-5">
        <PromoBanner
          src="/banner-promo-01.png"
          alt="O melhor churrasco que você já comeu"
        />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5 ">
          <h2 className="font-semibold">Pedidos recomendados</h2>
          <Button
            className="h-fit p-0 text-primary hover:bg-transparent"
            variant={"ghost"}
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner
          src="/banner-promo-02.gif"
          alt="O melhor churrasco que você já comeu"
        />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5 ">
          <h2 className="font-semibold">Restaurantes recomendados</h2>
          <Button
            className="h-fit p-0 text-primary hover:bg-transparent"
            variant={"ghost"}
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};
export default Home;

import CategoryList from "./_components/Category-list";
import Header from "./_components/Header";
import Search from "./_components/Search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

const fetch = async () => {
  const getProducts = db.product.findMany({
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

  const getBurguersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguersCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguersCategory,
    getPizzasCategory,
  ]);

  return { products, burguersCategory, pizzasCategory };
};
const Home = async () => {
  const { products, burguersCategory, pizzasCategory } = await fetch();
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
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <PromoBanner
            src="/banner-promo-01.png"
            alt="O melhor churrasco que você já comeu"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5 ">
          <h2 className="font-semibold">Pedidos recomendados</h2>
          <Button
            className="h-fit p-0 text-primary hover:bg-transparent"
            variant={"ghost"}
            asChild
          >
            <Link href={"/products/recommended"}>
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>
      <div className="px-5 pt-6">
        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <PromoBanner
            src="/banner-promo-02.gif"
            alt="O melhor hamburguer que você já comeu"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5 ">
          <h2 className="font-semibold">Restaurantes recomendados</h2>
          <Button
            className="h-fit p-0 text-primary hover:bg-transparent"
            variant={"ghost"}
            asChild
          >
            <Link href={"/restaurants/recommended"}>
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};
export default Home;

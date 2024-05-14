import Image from "next/image";
import CategoryList from "./_components/Category-list";
import Header from "./_components/Header";
import Search from "./_components/Search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";

export default function Home() {
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
        <Image
          src={"/banner-promo-01.png"}
          alt="O melhor churrasco que você já comeu"
          width={0}
          height={0}
          className="h-auto w-full rounded-lg object-contain"
          sizes="100vw"
          quality={100}
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
        <ProductList />
      </div>
    </>
  );
}

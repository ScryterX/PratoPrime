import Image from "next/image";
import CategoryList from "./_components/Category-list";
import Header from "./_components/Header";
import Search from "./_components/Search";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
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
    </div>
  );
}

import { db } from "@/app/_lib/prisma";

import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";

interface ProductPageProp {
  params: {
    id: string;
  };
}
const productPage = async ({ params: { id } }: ProductPageProp) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
    },
    include: {
      restaurant: true,
    },
  });
  if (!product) return notFound();

  return (
    <div>
      <ProductImage product={product} />
      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  );
};

export default productPage;

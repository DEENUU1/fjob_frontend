import Link from "next/link";
import React from "react";
import {Button} from "@nextui-org/react";


async function getProducts() {
  const response = await fetch(process.env.API_URL + "/api/payment/product/", {
    next: {revalidate: 300} // 5 minutes cache
  });
  return await response.json();
}

export default async function Products() {
  const productsData = getProducts();
  const data = await productsData;

  return (
    <>
      <div>
        {data ? (
          <div className="grid grid-cols-1 gap-3 kg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
            {data.map((product: any) => (
              <div key={product.name} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{product.name}</h5>
                  <p className="mb-2 text-xl font-light text-gray-800">Number of offers to
                    create: <strong>{product.value}</strong></p>
                  {product.price_euro === "0.00" ? (
                    <h3 className="mb-2 text-4xl font-bold tracking-tight text-green-700">{product.price_euro}€</h3>
                  ) : (
                    <h3 className="mb-2 text-4xl font-bold tracking-tight">{product.price_euro}€</h3>
                  )}

                  <Button isDisabled color="success">
                    Buy
                  </Button>
                </div>
              </div>

            ))}
          </div>
        ) : (
          <div>There is no products to display</div>
        )}
      </div>

    </>
  )
}
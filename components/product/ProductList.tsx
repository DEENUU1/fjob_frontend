import Link from "next/link";

async function FetchProducts() {
    const response = await fetch(process.env.API_URL + "/api/payment/product/", {"cache": "no-cache"});
    return await response.json();
}

export default async function Products(){
    const data = await FetchProducts();

    return (
        <>
            <div>
                {data ? (
                    <div className="grid grid-cols-1 gap-3 kg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
                        {data.map((product: any) => (
                            <div key={product.name} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{product.name}</h5>
                                    <p className="mb-2 text-xl font-light text-gray-800">Number of offers to create: <strong>{product.value}</strong></p>
                                    {product.price_euro === "0.00" ? (
                                        <h3 className="mb-2 text-4xl font-bold tracking-tight text-green-700">{product.price_euro}€</h3>
                                    ): (
                                        <h3 className="mb-2 text-4xl font-bold tracking-tight">{product.price_euro}€</h3>
                                    )}

                                    <Link href="/"
                                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        Buy
                                    </Link>
                                </div>
                            </div>

                        ))}
                    </div>
                ): (
                    <div>There is no products to display</div>
                )}
            </div>

        </>
    )
}
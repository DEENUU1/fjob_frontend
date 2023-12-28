import Link from "next/link";
import Image from "next/image";


async function FetchProducts() {
    const response = await fetch(process.env.API_URL + "/api/payment/product/");
    return await response.json();
}


export default async function Products(){
    const data = await FetchProducts();

    return (
        <>
            <div>
                {data ? (
                    <div className="grid grid-cols-3 gap-3">
                        {data.map((product: any) => (
                            <div key={product.name}
                                 className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">

                                    <div className="p-5">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{product.name}</h5>
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
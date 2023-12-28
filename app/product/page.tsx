import {Suspense} from "react";
import Spinner from "@/components/common/Spinner";
import {Metadata} from "next";
import Products from "@/components/product/ProductList";

export const metadata: Metadata = {
    title: 'FJob | Products',
}

function Page() {


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="">
                <h1 className="text-center font-bold text-3xl mb-10">Products</h1>

                <Suspense fallback={<Spinner/>}>
                    <Products/>
                </Suspense>

            </div>
        </main>
    );
}

export default Page;

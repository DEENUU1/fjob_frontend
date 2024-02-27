import {Suspense} from "react";
import Spinner from "@/components/common/Spinner";
import CompanyDetails from "@/components/companies/CompanyDetails";
import CompanyActiveOffers from "@/components/companies/GetPublicOffers";
import {getCompanyDetails} from "@/components/companies/CompanyDetails";

interface PageParams {
  slug: string;
}

export async function generateMetadata({params}: { params: PageParams }) {
  const slug = params.slug;
  const data = await getCompanyDetails(slug);

  return {
    "title": "FJob | " + data.name,
    "description": data.description,
  }

}

export default function Page({params}: { params: PageParams }) {
  const slug = params.slug;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
          <Suspense fallback={<Spinner/>}>
            <CompanyDetails companySlug={slug}/>
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<Spinner/>}>
            <CompanyActiveOffers companySlug={slug}/>
          </Suspense>
        </div>
      </div>
    </main>
  )
}
import ApplyForm from "@/components/offer/ApplyForm";


interface PageParams {
  id: string;
}


export default async function Page({params}: { params: PageParams }) {
  const offerId = params.id;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <ApplyForm offerId={offerId}/>
      </div>
    </main>
  )
}
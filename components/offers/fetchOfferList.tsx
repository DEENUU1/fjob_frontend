import getApiUrl from "@/components/api";
import { BiDotsVerticalRounded } from "react-icons/bi";

async function getOffers() {
    // imitate delay from API
    // await new Promise(resolve => setTimeout(resolve, 3000));

    const response = await fetch(`${getApiUrl()}api/offer/offer`, {
        next: {
             revalidate: 0
        }
    });

    return response.json();
}

type Dict = Record<number, any>;


function getDetails(offer: any) : Array<string> {
    const experienceList: Array<Dict> = offer.experience;
    const workTypeList: Array<Dict> = offer.worktype;
    const employmentTypeList: Array<Dict> = offer.experience;
    const isRemote: boolean = offer.is_remote;
    const isHybrid: boolean = offer.is_hybrid;
    const data: Array<string> = []

    if (isRemote) {
        data.push('Remote')
    }

    if (isHybrid) {
        data.push('Hybrid')
    }

    experienceList.forEach((exp) => {
        data.push(exp.name);
    });

    workTypeList.forEach((wt) => {
        data.push(wt.name);
    });

    employmentTypeList.forEach((et) => {
        data.push(et.name);
    });

    return data
}


export default async function OfferList(){
    const offers = await getOffers();
    console.log(offers)
    return (
        <>
            {offers.results.map((offer: any) => (
                <div className="border-2 border-red-900" key={offer.id}>
                    <div className="flex justify-between items-center border p-4">
                        <div className="flex items-start">
                            <div className="mr-4">
                                <h2 className="text-3xl font-medium">{offer.title}</h2>
                                <p className="text-base">{offer.company_name}</p>
                            </div>
                        </div>

                        <div className="flex items-center">

                            <div className="relative inline-block text-left">
                                <button className="text-2xl py-2 px-4 rounded-full focus:outline-none">
                                    <BiDotsVerticalRounded />
                                </button>
                            {/*  Save & Report job offer */}
                            </div>
                        </div>
                    </div>


                    <div>
                        <span>XXX</span>
                        <span>XYZ</span>
                    </div>


                    <div>
                        <p>{offer.description}</p>
                    </div>

                    <div>
                        <div>
                            <span> Localization </span>
                            <span> Created time, website</span>
                        </div>
                        <div>
                        {/*  Button to apply  */}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
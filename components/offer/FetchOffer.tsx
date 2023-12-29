import Link from "next/link";
import FavouriteButton from "@/components/offer/Favourite";
import ReportModal from "@/components/offer/Report";
import {GetDetails} from "@/components/offer/OfferCard";


async function GetOffer(slug: string) {
    const response = await fetch(process.env.API_URL + `/api/offer/offer/${slug}`, {
        next: {
            revalidate: 0
        }
    });
    return response.json();
}


function IsScraped(offer: any) {
    return offer.is_scraped;
}

function ProcessSkills(skills: string | null) {
    if (skills === null) {
        return [];
    }
    return skills.split(",");
}

function HasCustomForm(offer: any): boolean {
    return offer.apply_form === null;
}


export default async function OfferDetails({slug}) {
    const offer = await GetOffer(slug);
    const isScrapedOffer = IsScraped(offer);
    const skills = ProcessSkills(offer.skills);
    const hasForm = HasCustomForm(offer);


    return (
        <>
            <div className="container mx-auto max-w-2xl">
            <div className="mb-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-black text-3xl font-bold">{offer.title}</h2>
                        <span className="text-gray-500 text-sm mb-5">{offer.created_at}</span>

                        <div className="flex space-x-5">
                            <FavouriteButton offerId={offer.id}/>
                            <ReportModal offerId={offer.id}/>
                        </div>

                    </div>


                    <div>
                        {isScrapedOffer && (
                            <Link
                                href={offer.url}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Apply
                            </Link>
                        )}
                        {isScrapedOffer === false && hasForm ? (
                            <Link
                                href={offer.apply_form}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Apply
                            </Link>
                        ) : (
                            isScrapedOffer === false && !hasForm && (
                                <Link
                                    href="/"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Apply
                                </Link>
                            )
                        )}
                    </div>
                </div>

                <div className="mb-5">
                    {!isScrapedOffer ? (
                        <div>
                            <Link href={`/companies/${offer.company.id}`}>
                                <h2>Company: <strong>{offer.company.name}</strong></h2>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <h2>Company: <strong>{offer.company_name}</strong></h2>
                        </div>
                    )}
                </div>

                <div className="mb-3 flex flex-wrap gap-2">
                    {GetDetails(offer).map((detail: string) => (
                        <span
                            key={detail}
                            className="bg-black text-white font-medium rounded-2xl py-2 px-4"
                        >
                          {detail}
                        </span>
                    ))}
                </div>

                <div className="mb-2 mt-4">
                    {offer.salary.map((salary: any) => (
                        <div key={salary.id} className="flex items-center space-x-2">
                            {salary.salary_from && (
                                <span className="font-bold">{salary.salary_from}</span>
                            )}
                            {salary.salary_from && salary.salary_to && (
                                <span className="font-bold"> - </span>
                            )}
                            {salary.salary_to && (
                                <span className="font-bold">{salary.salary_to}</span>
                            )}
                            {salary.currency && salary.schedule && (
                                <span className="text-gray-600"> {salary.currency} /</span>
                            )}
                            {salary.schedule && (
                                <span className="text-gray-600">{salary.schedule}</span>
                            )}
                        </div>
                    ))}
                </div>
                    <div className="mb-2 mt-4">
                        {offer.addresses.map((address: Dict) => (
                            <p key={address.id}>
                                {address.country?.name ?? ''} {address.city?.name ?? ''} {address.region?.name ?? ''} {address.street ?? ''}
                            </p>
                        ))}
                    </div>
                    <div>
                        <p className="text-gray-700 text-lg mb-5 mt-3 align-baseline">{offer.description}</p>
                    </div>
            </div>

                {isScrapedOffer && (
                    <Link href={offer.url} className="link text-gray-400">{offer.url}</Link>
                )}
            </div>
        </>
    )
}
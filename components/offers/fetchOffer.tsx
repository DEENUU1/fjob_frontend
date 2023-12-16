import getApiUrl from "@/components/api";
import Link from "next/link";
import {FaHeart} from "react-icons/fa";
import {Fa0} from "react-icons/fa6";


async function getOffer(id: number) {
    const response = await fetch(`${getApiUrl()}/api/offer/offer/${id}`, {
        next: {
            revalidate: 0
        }
    });
    // Primitive backend delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    return response.json();
}


async function getOfferFavouriteCounter(id: number) {
    const response = await fetch(`${getApiUrl()}/api/favourite/counter/${id}`)

    return response.json();
}

function isScraped(offer: any) {
    return offer.is_scraped;
}

function processSkills(skills: string | null) {
    if (skills === null) {
        return [];
    }
    return skills.split(",");
}

function hasCustomForm(offer: any): boolean {
    return offer.apply_form === null;
}


export default async function OfferDetails({offerId}) {
    const offer = await getOffer(offerId);
    const isScrapedOffer = isScraped(offer);
    const skills = processSkills(offer.skills);
    const favouriteCounter = await getOfferFavouriteCounter(offerId);
    const hasForm = hasCustomForm(offer);


    return (
        <>
            <div className="mb-5">
                <div>
                    <h2 className="text-black text-3xl font-bold">{offer.title}</h2>
                    <span className="text-gray-500 text-sm mb-5">{offer.created_at}</span>

                    {isScrapedOffer && (
                        <Link
                            href={offer.url}
                            className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Apply
                        </Link>
                    )}
                    {isScrapedOffer === false && hasForm ? (
                        <Link
                            href={offer.apply_form}
                            className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Apply
                        </Link>
                    ) : (isScrapedOffer === false && !hasForm &&
                        <Link
                            href="/"
                            className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Apply
                        </Link>)}


                    {favouriteCounter.counter >= 1 && (
                        <div>
                          <span>{favouriteCounter.counter} <FaHeart/> </span>
                        </div>
                    )}

                </div>
                <p>{offer.description}</p>
            </div>

            <div className="mb-5">
                {!isScrapedOffer ? (
                    <div>
                        {/* todo add url to company details page */}
                        <Link href="/">
                            <h2>{offer.company.name}</h2>
                        </Link>
                        <img src={offer.company.logo} alt={offer.company.name}/>
                        <p>{offer.company.description}</p>

                        {skills.map((skill: any) => (
                            <span>{skill}</span>
                        ))}

                    </div>
                ) : (
                    <div>
                        <h2>{offer.company_name}</h2>
                        <img src={offer.company_logo}/>
                        <span>Source: {offer.url}</span>
                    </div>
                )}
            </div>


            {offer.is_remote && (
                <span>Remote</span>
            )}
            {offer.is_hybrid && (
                <span>Hybrid</span>
            )}

            {offer.addresses.map((addresses: any) => (
                <p>{addresses.country.name} {addresses.city.name} {addresses.region.name} {addresses.street}</p>
            ))}

            {offer.salary.map((salary: any) => (
                <div>
                    <span>{salary.salary_from}</span>
                    <span> - </span>
                    <span>{salary.salary_to}</span>
                    <span> {salary.currency}</span>
                    <span>/</span>
                    <span>{salary.schedule}</span>
                </div>
            ))}


            {offer.experience.map((experience: any) => (
                <div>
                    <span>{experience.name}</span>
                </div>
            ))}

            {offer.work_type.map((workType: any) => (
                <div>
                    <span>{workType.name}</span>
                </div>
            ))}

            {offer.employment_type.map((employmentType: any) => (
                <div>
                    <span>{employmentType.name}</span>
                </div>
            ))}

        </>
    )
}
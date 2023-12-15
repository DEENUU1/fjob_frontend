import getApiUrl from "@/components/api";
import Link from "next/link";
import {addRequestMeta} from "next/dist/server/request-meta";


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


function isScraped(offer: any) {
    return offer.is_scraped;
}

function isApplyForm(offer: any) {
    return (!offer.apply_form === null)
}

function processSkills(skills: string | null) {
    if (skills === null) {
        return [];
    }
    return skills.split(",");
}



export default async function OfferDetails({offerId}) {
    const offer = await getOffer(offerId);
    const isScrapedOffer = isScraped(offer);
    const hasApplyForm = isApplyForm(offer)
    const skills = processSkills(offer.skills);
    return (
        <>
            <div className="mb-5">
                <div>
                    <h2 className="text-black text-3xl font-bold">{offer.title}</h2>
                    <span className="text-gray-500 text-sm mb-5">{offer.created_at}</span>

                    {!hasApplyForm ? (
                        <Link href={offer.apply_form}
                           className="border-4 border-purple-800 w-full rounded-xl bg-purple-300 font-bold hover:bg-purple-500">
                            Apply now
                        </Link>
                    ) : (
                        <Link href="/"
                           className="border-4 border-purple-800 w-full rounded-xl bg-purple-300 font-bold hover:bg-purple-500">
                            Apply now
                        </Link>
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
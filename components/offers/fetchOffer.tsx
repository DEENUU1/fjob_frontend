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

function processSkills(skills: string | null){
    if(skills === null){
        return [];
    }
    return skills.split(",");
}


export default async function OfferDetails({offerId}){
    const offer = await getOffer(offerId);
    const isScrapedOffer = isScraped(offer);
    const hasApplyForm = isApplyForm(offer)
    const skills = processSkills(offer.skills);
    return (
        <>

            <h1>{offer.title}</h1>
            <span>{offer.created_at}</span>
            <p>{offer.description}</p>

            {/* Iterate through skills to place every element of array in other span */}
            {skills.map((skill: any) => (
                <span>{skill}</span>
            ))}


            <p>Is remote: {offer.is_remote}</p>
            <p>Is hybrid: {offer.is_hybrid}</p>



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
            {/* If apply form is not none */}
            {!hasApplyForm ? (
                <div>
                    <a href={offer.apply_form}>
                        Apply now (company custom form)
                    </a>
                </div>
            ) : (
                <div>
                    <Link href="/">Apply now</Link>
                </div>

            )}

            {/* If not isScraped offer*/}
            {!isScrapedOffer ? (
                <div>
                    {/* todo add url to company details page */}
                    <Link href="/">
                        <h2>{offer.company.name}</h2>
                    </Link>
                    <img src={offer.company.logo} alt={offer.company.name}/>
                    <p>{offer.company.description}</p>
                </div>
            ): (
                <div>
                    <h2>{offer.company_name}</h2>
                    <img src={offer.company_logo}/>
                    <span>Source: {offer.url}</span>
                </div>
            )}

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


            {offer.addresses.map((addresses: any) => (
                <p>{addresses.country.name} {addresses.city.name} {addresses.region.name} {addresses.street}</p>
            ))}
        </>

    )
}
import Link from "next/link";
import FavouriteButton from "@/components/offer/favourite";
import ReportModal from "@/components/offer/report";
import {useAppSelector} from "@/redux/hooks";
import getApiUrl from "@/components/api";

type Dict = Record<number, any>;


export function getDetails(offer: any): Array<string> {
    const experienceList: Array<Dict> = offer.experience;
    const workTypeList: Array<Dict> = offer.work_type;
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


interface Localization {
    country?: { name: string } | null;
    region?: { name: string } | null;
    city?: { name: string } | null;
}

function getLocalization(offer: any): string {
    const localizationList: Array<Localization> = offer.addresses;

    const numOfData: number = localizationList.length;

    if (numOfData === 0) {
        return '';
    } else if (numOfData === 1) {
        const firstLocalization = localizationList[0];
        const countryName = firstLocalization.country?.name || 'N/A';
        const regionName = firstLocalization.region?.name || 'N/A';
        const cityName = firstLocalization.city?.name || 'N/A';
        return `${countryName}, ${regionName}, ${cityName}`;
    } else {
        const firstLocalization = localizationList[0];
        const additionalLocalizations = numOfData - 1;
        if (numOfData === 2) {
            return `${firstLocalization?.country?.name}, ${firstLocalization?.region?.name}, ${firstLocalization?.city?.name} + ${additionalLocalizations} localization`;
        }
        return `${firstLocalization.country?.name}, ${firstLocalization.region?.name}, ${firstLocalization.city?.name} + ${additionalLocalizations} localizations`;
    }
}

interface Salary {
    salaryFrom?: number;
    salaryTo?: number;
    currency?: string;
    schedule?: string;
}

function getSalary(offer: any): string {
    const salaryList: Array<Salary> = offer.salary;
    const numOfData: number = salaryList.length;

    if (numOfData === 0) {
        return '';
    } else if (numOfData === 1) {
        const firstSalary = salaryList[0];
        if (firstSalary.salaryFrom === null && firstSalary.salaryTo === null) {
            return '';
        } else {
            return `${firstSalary.salaryFrom ?? 'N/A'} - ${firstSalary.salaryTo ?? 'N/A'} ${firstSalary.currency ?? "N/A"}/${firstSalary.schedule ?? "N/A"}`;
        }
    } else {
        return `${salaryList[0].salaryFrom ?? 'N/A'} - ${salaryList[0].salaryTo ?? 'N/A'} ${salaryList[0].currency ?? "N/A"}/${salaryList[0].schedule ?? "N/A"} + ${numOfData - 1} salaries`;
    }
}


function getCreatedTime(offer: any): string {
    const createdTime = offer.created_at;
    return createdTime.slice(0, 10);

}

function hasCustomForm(offer: any): boolean {
    return offer.apply_form === null;
}


export default function OfferCard({offer}: any) {
    const isNew = offer.is_new;
    const isScraped = offer.is_scraped;
    const hasForm = hasCustomForm(offer);

    return (
        <>
            <div
                className="border-2 border-3-black hover:border-black hover:border-3 rounded-2xl container mb-4 mt-4"
                key={offer.title}>
                <div className="flex justify-between items-center p-4">
                    <div className="flex items-start">
                        <div className="mr-4">
                            <Link href={`/offer/${offer.slug}`}>
                                <h2 className="text-3xl font-medium">{offer.title}</h2>

                            </Link>
                            {isScraped ? (
                                <div>
                                    <span className="text-lg text-gray-700">{offer.company_name}</span>
                                </div>
                            ) : (
                                <div>
                                    <Link className="text-lg text-gray-700" href={`/companies/${offer.company.id}`}>{offer.company.name}</Link>
                                </div>
                            )}
                            <h4 className="text-xl font-bold">{getSalary(offer)}</h4>
                        </div>
                    </div>

                    <div className="flex items-center">

                        <div className="relative inline-block text-left">
                            <div className="inline-block absolute top-0 right-0">
                                <div className="flex items-center space-x-4">
                                    <ReportModal offerId={offer.id}/>
                                    <FavouriteButton offerId={offer.id}/>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mb-3 flex flex-wrap gap-2">
                    {getDetails(offer).map((detail: string) => (
                        <span
                            key={detail}
                            className="bg-black text-white font-medium rounded-2xl py-2 px-4"
                        >
                          {detail}
                        </span>
                    ))}
                </div>


                <div className="mb-3 p-4">
                    {offer.description != null ? (
                        <p>{offer.description.slice(0, 100)}...</p>
                    ):(
                        <p></p>
                    )}
                </div>

                <div className="p-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="mb-1">
                            <span className="text-gray-700">{getLocalization(offer)}</span>
                        </div>
                        <div>
                            <span className="text-gray-400 mr-2">{getCreatedTime(offer)}</span>
                            {isNew &&
                                <span className="indicator-item badge badge-secondary">NEW</span>
                            }
                        </div>
                    </div>
                    <div>
                        {isScraped && offer.url != null && (
                            <Link
                                href={offer.url}
                                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Apply
                            </Link>
                        )}
                        {isScraped === false && hasForm ? (
                            <Link
                                href={offer.apply_form}
                                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Apply
                            </Link>
                        ) : (isScraped === false && !hasForm &&
                            <Link
                                href="/"
                                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Apply
                            </Link>)}

                    </div>
                </div>
            </div>
        </>
    )
}
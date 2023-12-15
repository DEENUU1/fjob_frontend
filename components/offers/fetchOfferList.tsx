import Link from "next/link";
import FavouriteButton from "@/components/offers/favourite";
import ReportModal from "@/components/offers/report";
import {useAppSelector} from "@/redux/hooks";
import getApiUrl from "@/components/api";

type Dict = Record<number, any>;


function getDetails(offer: any): Array<string> {
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


function getLocalization(offer: any): string {
    const localizationList: Array<Dict> = offer.addresses;

    const numOfData: number = localizationList.length;

    if (numOfData === 0) {
        return '';
    } else if (numOfData === 1) {
        const firstLocalization = localizationList[0];
        return `${firstLocalization.country.name}, ${firstLocalization.region.name}, ${firstLocalization.city.name}`;
    } else {
        const firstLocalization = localizationList[0];
        const additionalLocalizations = numOfData - 1;
        if (numOfData === 2) {
            return `${firstLocalization.country.name}, ${firstLocalization.region.name}, ${firstLocalization.city.name} + ${additionalLocalizations} localization`;
        }
        return `${firstLocalization.country.name}, ${firstLocalization.region.name}, ${firstLocalization.city.name} + ${additionalLocalizations} localizations`;
    }
}


interface Salary {
    salaryFrom?: number,
    salaryTo?: number,
    currency?: string,
    schedule?: string

}

function getSalary(offer: any): string {
    const salaryList: Array<Salary> = offer.salary;
    const numOfData: number = salaryList.length;

    if (numOfData === 0) {
        return '';
    }
    else if (numOfData === 1) {
        const firstSalary = salaryList[0];
        return `${firstSalary.salary_from} - ${firstSalary.salary_to} ${firstSalary.currency}/${firstSalary.schedule}`;
    }
    else {
        return `${salaryList[0].salary_from} - ${salaryList[0].salary_to} ${salaryList[0].currency}/${salaryList[0].schedule} + ${numOfData - 1} salaries`;
    }
}


function getCreatedTime(offer: any): string {
    const createdTime = offer.created_at;
    return createdTime.slice(0, 10);

}


export default function OfferCard({offer}: any) {
    const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);


    return (
        <>
                <div
                    className="border-2 border-3-black hover:border-black hover:border-3 rounded-2xl container mb-4 mt-4"
                    key={offer.id}>
                    <div className="flex justify-between items-center p-4">
                        <div className="flex items-start">
                            <div className="mr-4">
                                <Link href={`offer/${offer.id}`}>
                                    <h2 className="text-3xl font-medium">{offer.title}</h2>
                                </Link>
                                <p className="text-base">{offer.company_name}</p>
                                <h4 className="text-xl font-bold">{getSalary(offer)}</h4>
                            </div>
                        </div>

                        <div className="flex items-center">

                            <div className="relative inline-block text-left">
                                {isAuthenticated &&
                                    <div className="inline-block absolute top-0 right-0">
                                        <div className="flex items-center space-x-4">
                                            <ReportModal offerId={offer.id}/>
                                            <FavouriteButton offerId={offer.id}/>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>


                    <div className="mb-3">
                        {getDetails(offer).map((detail: string) => (
                            <span className="bg-black text-white font-medium rounded-2xl ml-4 py-2 px-2"
                                  key={detail}>{detail}</span>
                        ))}
                    </div>


                    <div className="mb-3 p-4">
                        <p>{offer.description.slice(0, 100)}...</p>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                        <div className="flex flex-col">
                            <div className="mb-1">
                                <span className="text-gray-700">{getLocalization(offer)}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">{getCreatedTime(offer)}</span>
                            </div>
                        </div>
                        <div>
                            <Link
                                href="/"
                                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Apply
                            </Link>
                        </div>
                    </div>


                </div>
        </>
    )
}
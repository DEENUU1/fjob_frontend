import Link from "next/link";
import FavouriteButton from "@/components/offer/Favourite";
import ReportModal from "@/components/offer/Report";
import {Badge} from "@/components/ui/badge"


export function getDetails(offer: any): Array<string> {
  const experienceList: Experience[] = offer.experience;
  const workTypeList: WorkType[] = offer.work_type;
  const employmentTypeList: EmploymentType[] = offer.experience;
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
  const localizationList: Address[] = offer.addresses;

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


function getSalary(offer: Offer): string {
  const salaryList: Array<Salary> = offer.salary;
  const numOfData: number = salaryList.length;

  if (numOfData === 0) {
    return '';
  } else if (numOfData === 1) {
    const firstSalary = salaryList[0];
    if (firstSalary.salary_from === null && firstSalary.salary_to === null) {
      return '';
    } else {
      return `${firstSalary.salary_from ?? 'N/A'} - ${firstSalary.salary_to ?? 'N/A'} ${firstSalary.currency ?? "N/A"}/${firstSalary.schedule ?? "N/A"}`;
    }
  } else {
    return `${salaryList[0].salary_from ?? 'N/A'} - ${salaryList[0].salary_to ?? 'N/A'} ${salaryList[0].currency ?? "N/A"}/${salaryList[0].schedule ?? "N/A"} + ${numOfData - 1} salaries`;
  }
}


function getCreatedTime(offer: any): string {
  const createdTime = offer.created_at;
  return createdTime.slice(0, 10);

}

function hasCustomForm(offer: any): boolean {
  return offer.apply_form === null;
}

export function detailBadge(detail: string) {
  return <Badge>{detail}</Badge>
}


export default function OfferCard({offer}: any) {
  const isNew = offer.is_new;
  const isScraped = offer.is_scraped;
  const hasForm = hasCustomForm(offer);

  return (
    <>
      <div
        className={`border-2 border-gray-200 hover:shadow-md  rounded-xl container mb-4 mt-4 ${!isScraped && 'bg-yellow-50'}`}
        key={offer.title}>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-start md:mr-4">
            <div className="md:mr-4">
              <Link href={`/offer/${offer.slug}`}>
                <h2 className="text-xl font-medium">{offer.title}</h2>

              </Link>
              {isScraped ? (
                <div>
                  <span className="text-md text-gray-700">{offer.company_name}</span>
                </div>
              ) : (
                <div>
                  <Link className="text-md text-gray-700"
                        href={`/companies/${offer.company.slug}`}>{offer.company.name}</Link>
                </div>
              )}
              <h4 className="text-md font-bold">{getSalary(offer)}</h4>
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

        <div className="mb-1 p-4 flex flex-wrap gap-2">
          {getDetails(offer).map((detail: string) => (
            detailBadge(detail)
          ))}
        </div>

        <div className="p-4">
          {offer.description != null ? (
            <p className="inline-block">{offer.description.slice(0, 100)}...</p>
          ) : (
            <p className="inline-block"></p>
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
                target="_blank"
              >
                Apply
              </Link>
            )}
            {!isScraped && !hasForm ? (
              <Link
                href={offer.apply_form}
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                target="_blank"
              >
                Apply
              </Link>
            ) : (!isScraped && hasForm && <Link
                href={`/offer/apply/${offer.id}`}
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
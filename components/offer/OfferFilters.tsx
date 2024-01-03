import React, {Dispatch, SetStateAction} from "react";
import GetExperiences from "@/components/offer/Experience";
import GetWorkType from "@/components/offer/WorkType";
import GetEmploymentTypes from "@/components/offer/EmploymentType";


export default function OfferFilters(
    {
      search,
      isRemote,
      isHybrid,
      ordering,
      experience,
      workType,
      employmentType,
      setSearch,
      setIsRemote,
      setIsHybrid,
      setOrdering,
      setExperience,
      setWorkType,
      setEmploymentType,
    }: {
        search: string,
        isRemote: string,
        isHybrid: string,
        ordering: string,
        experience: string,
        workType: string,
        employmentType: string,
        setSearch: Dispatch<SetStateAction<string>>,
        setIsRemote: Dispatch<SetStateAction<string>>,
        setIsHybrid: Dispatch<SetStateAction<string>>,
        setOrdering: Dispatch<SetStateAction<string>>,
        setExperience: Dispatch<SetStateAction<string>>,
        setWorkType: Dispatch<SetStateAction<string>>,
        setEmploymentType: Dispatch<SetStateAction<string>>,
    }){
    const orderingTypes = new Map();
    orderingTypes.set("Newest", "-created_at");
    orderingTypes.set("Oldest", "created_at");
    orderingTypes.set("Lowest salary", "salary__salary_from");
    orderingTypes.set("Highest salary", "-salary__salary_from");

    const experiences = GetExperiences();
    const workTypes = GetWorkType();
    const employmentTypes = GetEmploymentTypes();

    return (
        <>
        <div className="lg:flex lg:space-x-4 lg:items-center lg:mb-4">
            <div className="lg:w-1/4 mb-4 lg:mb-0">
                <input
                    type="text"
                    id="search"
                    className="w-full border-2 border-gray-700 bg-gray-50 rounded-2xl font-medium focus:ring-blue-400 p-2"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="lg:w-1/4 mb-4">
                <label className="font-medium p-2" htmlFor="ordering">
                    Sort by:
                </label>
                <select
                    className="w-full bg-gray-50 font-medium p-2"
                    id="ordering"
                    value={ordering}
                    onChange={(e) => setOrdering(e.target.value)}
                >
                    {Array.from(orderingTypes.keys()).map((key) => (
                        <option key={key} value={orderingTypes.get(key)}>
                            {key}
                        </option>
                    ))}
                </select>
            </div>

            <div className="lg:w-1/4 mb-4">
                <label className="font-medium p-2" htmlFor="is_remote">
                    Is remote:
                </label>
                <input
                    className="font-medium"
                    type="checkbox"
                    id="is_remote"
                    checked={isRemote === "true"}
                    onChange={(e) => setIsRemote(e.target.checked ? "true" : "")}
                />
            </div>

            <div className="lg:w-1/4 mb-4">
                <label className="font-medium p-2" htmlFor="is_hybrid">
                    Is hybrid:
                </label>
                <input
                    type="checkbox"
                    id="is_hybrid"
                    checked={isHybrid === "true"}
                    onChange={(e) => setIsHybrid(e.target.checked ? "true" : "")}
                />
            </div>
        </div>

        <div className="lg:flex lg:space-x-4 lg:items-center">
                <label className="font-medium p-2" htmlFor="experience">Experience</label>
                <select className="w-full bg-gray-50 font-medium p-2" id="experience" value={experience}
                        onChange={(e) => setExperience(e.target.value)}>
                    <option value="All">All</option>
                    {experiences && experiences.length > 0 && experiences.map((experience: any) => (
                        <option key={experience.name} value={experience.id}>{experience.name}</option>
                    ))}
                </select>

                <label className="font-medium p-2" htmlFor="work_type">Work type</label>
                <select className="w-full bg-gray-50 font-medium p-2" id="work_type" value={workType}
                        onChange={(e) => setWorkType(e.target.value)}>
                    <option value="All">All</option>
                    {workTypes && workTypes.length > 0 && workTypes.map((workType: any) => (
                        <option key={workType.name} value={workType.id}>{workType.name}</option>
                    ))}
                </select>

                <label className="font-medium p-2" htmlFor="employment_type">Employment type</label>
                <select className="w-full bg-gray-50 font-medium p-2" id="employment_type" value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}>
                    <option value="All">All</option>
                    {employmentTypes && employmentTypes.length > 0 && employmentTypes.map((employmentType: any) => (
                        <option key={employmentType.name} value={employmentType.id}>{employmentType.name}</option>
                    ))}
                </select>

            </div>
        </>
    );
}

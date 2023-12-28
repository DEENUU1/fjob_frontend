import React from "react";
import GetExperiences from "@/components/offer/Experience";
import GetWorkType from "@/components/offer/WorkType";
import GetEmploymentTypes from "@/components/offer/EmploymentType";


function OfferFilters({
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
                      }) {
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
            <div>
            <div className="log:flex log:flex-row mt-10 lg:gap-4">
                <input type="text" id="search"
                       className="lg:border-2 lg:border-gray-700 lg:bg-gray-50 lg:rounded-2xl lg:font-medium lg:focus:ring-blue-400 lg:p-2"
                       placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>

                <label className="font-medium p-2" htmlFor="is_remote">Is remote:</label>
                <input className="font-medium " type="checkbox" id="is_remote" checked={isRemote === "true"}
                       onChange={(e) => setIsRemote(e.target.checked ? "true" : "")}/>

                <label className="font-medium p-2" htmlFor="is_hybrid">Is hybrid:</label>
                <input type="checkbox" id="is_hybrid" checked={isHybrid === "true"}
                       onChange={(e) => setIsHybrid(e.target.checked ? "true" : "")}/>

                <label className="font-medium p-2" htmlFor="ordering">Sort by:</label>
                <select className="bg-gray-50 font-medium p-2" id="ordering" value={ordering}
                        onChange={(e) => setOrdering(e.target.value)}>
                    {Array.from(orderingTypes.keys()).map((key) => (
                        <option key={key} value={orderingTypes.get(key)}>{key}</option>
                    ))}
                </select>
            </div>


            <div className="lg:flex lg:flex-row mt-10 lg:gap-4">
                <label className="font-medium p-2" htmlFor="is_hybrid">Experience</label>
                <select className="lg:bg-gray-50 lg:font-medium lg:p-2" id="experience" value={experience}
                        onChange={(e) => setExperience(e.target.value)}>
                    <option value="All">All</option>
                    {experiences && experiences.length > 0 && experiences.map((experience: any) => (
                        <option key={experience.name} value={experience.id}>{experience.name}</option>
                    ))}
                </select>
            </div>

            <div className="lg:flex lg:flex-row mt-10 lg:gap-4">
                <label className="font-medium p-2" htmlFor="is_hybrid">Work type</label>
                <select className="lg:bg-gray-50 lg:font-medium lg:p-2" id="work_type" value={workType}
                        onChange={(e) => setWorkType(e.target.value)}>
                    <option value="All">All</option>
                    {workTypes && workTypes.length > 0 && workTypes.map((workType: any) => (
                        <option key={workType.name} value={workType.id}>{workType.name}</option>
                    ))}
                </select>
            </div>

            <div className="lg:flex lg:flex-row mt-10 lg:gap-4">
                <label className="font-medium p-2" htmlFor="is_hybrid">Employment type</label>
                <select className="lg:bg-gray-50 lg:font-medium lg:p-2" id="employment_type" value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}>
                    <option value="All">All</option>
                    {employmentTypes && employmentTypes.length > 0 && employmentTypes.map((employmentType: any) => (
                        <option key={employmentType.name} value={employmentType.id}>{employmentType.name}</option>
                    ))}
                </select>
            </div>

            </div>
        </>
    );
}

export default OfferFilters;

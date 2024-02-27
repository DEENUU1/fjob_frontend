import React, {Dispatch, SetStateAction} from "react";


export default function CandidateFilter(
  {
    ordering,
    status,
    futureRecruitment,
    setOrdering,
    setStatus,
    setFutureRecruitment,
  }: {
    ordering: string,
    status: string,
    futureRecruitment: string,
    setOrdering: Dispatch<SetStateAction<string>>,
    setStatus: Dispatch<SetStateAction<string>>,
    setFutureRecruitment: Dispatch<SetStateAction<string>>,
  }) {

  const orderingTypes = new Map();
  orderingTypes.set("Newest", "-created_at");
  orderingTypes.set("Oldest", "created_at");

  const statusType = new Map();
  statusType.set("All", "");
  statusType.set("Pending", "PENDING");
  statusType.set("Accepted", "ACCEPTED");
  statusType.set("Rejected", "REJECTED");

  return (
    <>
      <div className="lg:flex lg:space-x-4 lg:items-center lg:mb-4">
        <label htmlFor="ordering" className="text-sm font-medium text-gray-600 lg:w-24 lg:flex-shrink-0">
          Sort by:
        </label>
        <select
          id="ordering"
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          className="block w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
        >
          {Array.from(orderingTypes.keys()).map((key) => (
            <option key={key} value={orderingTypes.get(key)}>
              {key}
            </option>
          ))}
        </select>

        <label htmlFor="status" className="text-sm font-medium text-gray-600 lg:w-24 lg:flex-shrink-0">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="block w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
        >
          {Array.from(statusType.keys()).map((key) => (
            <option key={key} value={statusType.get(key)}>
              {key}
            </option>
          ))}
        </select>

        <label htmlFor="future-recruitment" className="text-sm font-medium text-gray-600 lg:w-24 lg:flex-shrink-0">
          Future recruitment
        </label>
        <input type="checkbox" id="future-recruitment" checked={futureRecruitment === "true"}
               onChange={(e) => setFutureRecruitment(e.target.checked ? "true" : "")}/>
      </div>
    </>
  );
}
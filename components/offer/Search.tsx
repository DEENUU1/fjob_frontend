'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React from "react";
import getExperiences from "@/components/offer/Experience";
import getEmploymentTypes from "@/components/offer/EmploymentType";
import getWorkType from "@/components/offer/WorkType";


export function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="w-full border-2 border-gray-700 bg-gray-50 rounded-2xl font-medium focus:ring-blue-400 p-2"
                placeholder="Search..."
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    );
}

export function Remote(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleIsRemote(is_remote: boolean) {
        const params = new URLSearchParams(searchParams);
        if (is_remote) {
            params.set('is_remote', 'true');
        } else {
            params.delete('is_remote');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
            <label htmlFor="search" className="sr-only">
                Is Remote
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                type="checkbox"
                onChange={(e) => {
                    handleIsRemote(e.target.checked);
                }}
                defaultValue={searchParams.get('is_remote')?.toString()}
            />
        </div>
    )
}


export function Hybrid(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleIsRemote(is_remote: boolean) {
        const params = new URLSearchParams(searchParams);
        if (is_remote) {
            params.set('is_hybrid', 'true');
        } else {
            params.delete('is_hybrid');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
            <label htmlFor="search" className="sr-only">
                Is hybrid
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                type="checkbox"
                onChange={(e) => {
                    handleIsRemote(e.target.checked);
                }}
                defaultValue={searchParams.get('is_hybrid')?.toString()}
            />
        </div>
    )
}


export function Sort(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const orderingTypes = new Map();
    orderingTypes.set("Newest", "-created_at");
    orderingTypes.set("Oldest", "created_at");
    orderingTypes.set("Lowest salary", "salary__salary_from");
    orderingTypes.set("Highest salary", "-salary__salary_from");


    function handleSort(ordering: string) {
        const params = new URLSearchParams(searchParams);
        if (ordering) {
            params.set('ordering', ordering);
        } else {
            params.delete('ordering');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
            <label htmlFor="search" className="sr-only">
                Is hybrid
            </label>

            <select
                className="w-full bg-gray-50 font-medium p-2"
                id="ordering"
                onChange={(e) => handleSort(e.target.value)}
                defaultValue={searchParams.get('ordering')?.toString()}
            >
                {Array.from(orderingTypes.keys()).map((key) => (
                    <option key={key} value={orderingTypes.get(key)}>
                        {key}
                    </option>
                ))}
            </select>
        </div>
    )
}


export function WorkType(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const options = getWorkType();

    function handleWorkType(workType: string) {
        const params = new URLSearchParams(searchParams);
        if (workType) {
            params.set('work_type', workType);
        }
        else {
            params.delete('work_type');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
            <label htmlFor="search" className="sr-only">
                Work Type
            </label>

            <select
                className="w-full bg-gray-50 font-medium p-2"
                id="ordering"
                onChange={(e) => handleWorkType(e.target.value)}
                defaultValue={searchParams.get('work_type')?.toString()}
            >
                <option value="">All</option>
                {options && options.length > 0 && options.map((workType: any) => (
                    <option key={workType.name} value={workType.id}>{workType.name}</option>
                ))}
            </select>
        </div>
    )
}


export function Experience(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const options = getExperiences();

    function handleExperience(experience: string) {
        const params = new URLSearchParams(searchParams);
        if (experience) {
            params.set('experience', experience);
        }
        else {
            params.delete('experience');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
            <label htmlFor="search" className="sr-only">
                Work Type
            </label>

            <select
                className="w-full bg-gray-50 font-medium p-2"
                id="ordering"
                onChange={(e) => handleExperience(e.target.value)}
                defaultValue={searchParams.get('experience')?.toString()}
            >
                <option value="">All</option>
                {options && options.length > 0 && options.map((emperienceType: any) => (
                    <option key={emperienceType.name} value={emperienceType.id}>{emperienceType.name}</option>
                ))}
            </select>
        </div>
    )
}


export function Employment(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const options = getEmploymentTypes();

    function handleEmployment(employment: string) {
        const params = new URLSearchParams(searchParams);
        if (employment) {
            params.set('employment_type', employment);
        }
        else {
            params.delete('employment_type');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
            <label htmlFor="search" className="sr-only">
                Employment Type
            </label>

            <select
                className="w-full bg-gray-50 font-medium p-2"
                id="ordering"
                onChange={(e) => handleEmployment(e.target.value)}
                defaultValue={searchParams.get('employment_type')?.toString()}
            >
                <option value="">All</option>
                {options && options.length > 0 && options.map((emperienceType: any) => (
                    <option key={emperienceType.name} value={emperienceType.id}>{emperienceType.name}</option>
                ))}
            </select>
        </div>
    )
}
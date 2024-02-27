'use client';

import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import React from "react";
import getExperiences from "@/components/offer/Experience";
import getEmploymentTypes from "@/components/offer/EmploymentType";
import getWorkType from "@/components/offer/WorkType";
import {Checkbox} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";

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
    <>
      <Input
        // className="w-full border-2 border-gray-700 bg-gray-50 rounded-2xl font-medium focus:ring-blue-400 p-2"
        // placeholder="Search..."
        label="Search"
        type="text"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </>
  );
}

export function Remote() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

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
    <>
      <label className="font-medium p-2" htmlFor="is_remote">
        Is remote:
      </label>
      <Checkbox
        id="is_remote"
        onChange={(e) => {
          handleIsRemote(e.target.checked);
        }}
        defaultValue={searchParams.get('is_remote')?.toString()}
      />
    </>
  )
}


export function Hybrid() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

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
    <>
      <label className="font-medium p-2" htmlFor="is_hybrid">
        Is hybrid
      </label>
      <Checkbox
        id="is_hybrid"
        onChange={(e) => {
          handleIsRemote(e.target.checked);
        }}
        defaultValue={searchParams.get('is_hybrid')?.toString()}
      />
    </>
  )
}


export function Sort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

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
    <>
      <Select
        label="Order by"
        id="ordering"
        onChange={(e) => handleSort(e.target.value)}
      >
        {Array.from(orderingTypes.keys()).map((key) => (
          <SelectItem key={orderingTypes.get(key)} value={orderingTypes.get(key)}>
            {key}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}


export function WorkType() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  const options = getWorkType();

  function handleWorkType(workType: string) {
    const params = new URLSearchParams(searchParams);
    if (workType) {
      params.set('work_type', workType);
    } else {
      params.delete('work_type');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <Select
        label="Work type"
        id="work_type"
        onChange={(e) => handleWorkType(e.target.value)}
      >
        <SelectItem key="" value="">All</SelectItem>
        {options && options.length > 0 && options.map((workType: any) => (
          <SelectItem key={workType.id} value={workType.id}>{workType.name}</SelectItem>
        ))}
      </Select>
    </>
  )
}


export function Experience() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  const options = getExperiences();

  function handleExperience(experience: string) {
    const params = new URLSearchParams(searchParams);
    if (experience) {
      params.set('experience', experience);
    } else {
      params.delete('experience');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <Select
        label="Experience level"
        id="experience"
        onChange={(e) => handleExperience(e.target.value)}
      >
        <SelectItem key="" value="">All</SelectItem>
        {options && options.length > 0 && options.map((emperienceType: any) => (
          <SelectItem key={emperienceType.id} value={emperienceType.id}>{emperienceType.name}</SelectItem>
        ))}
      </Select>
    </>
  )
}


export function Employment() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  const options = getEmploymentTypes();

  function handleEmployment(employment: string) {
    const params = new URLSearchParams(searchParams);
    if (employment) {
      params.set('employment_type', employment);
    } else {
      params.delete('employment_type');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <Select
        label="Employment type"
        id="employment"
        onChange={(e) => handleEmployment(e.target.value)}
      >
        <SelectItem key="" value="">All</SelectItem>
        {options && options.length > 0 && options.map((emperienceType: any) => (
          <SelectItem key={emperienceType.id} value={emperienceType.id}>{emperienceType.name}</SelectItem>
        ))}
      </Select>
    </>
  )
}

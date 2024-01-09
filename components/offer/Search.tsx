'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';


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
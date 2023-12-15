'use client';

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import Spinner from '@/components/common/Spinner';
import List from '@/components/common/List';

export default function Page() {
	const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

	const config = [
		{
			label: 'First Name',
			value: user?.first_name,
		},
		{
			label: 'Last Name',
			value: user?.last_name,
		},
		{
			label: 'Email',
			value: user?.email,
		},
	];

	if (isLoading || isFetching) {
		return (
			<div className='flex justify-center my-8'>
				<Spinner lg />
			</div>
		);
	}

	return (
		<>

			<main className='mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8'>
				<List config={config} />
			</main>
		</>
	);
}

'use client';

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import Spinner from '@/components/common/Spinner';
import List from '@/components/common/List';
import {useState, useEffect} from "react";
import getApiUrl from "@/components/api";
import { useRouter } from 'next/navigation';
import {toast} from "react-toastify";


export default function Page() {
	const { data: user, isLoading, isFetching } = useRetrieveUserQuery();
	const token = localStorage.getItem('access');
	const router = useRouter();

	const [firstName, setFirstName] = useState(user?.first_name);
	const [lastName, setLastName] = useState(user?.last_name);

	useEffect(() => {
		const intervalId = setTimeout(() => {
			fetch(`${getApiUrl()}api/users/me/`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ first_name: firstName, last_name: lastName })
			})
				.then(response => response.json())
				.then(data => {
					router.refresh();
				})
				.catch(error => {
					toast.error('Something went wrong');
					console.log(error)
				});
		}, 1000); // 1 second delay

		return () => {
			clearTimeout(intervalId);
		};
	}, [firstName, lastName]);



	return (
		<>
			<main className='mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8'>

				<div>
					<label>First name</label>
					<input type="text" onChange={(e) => setFirstName(e.target.value)} value={user?.first_name}  />

					<label>Last name</label>
					<input type="text" onChange={(e) => setLastName(e.target.value)} value={user?.last_name} />
				</div>

			</main>
		</>
	);
}

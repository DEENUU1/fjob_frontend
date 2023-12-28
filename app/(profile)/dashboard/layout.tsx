import { RequireAuth } from '@/components/utils';
import Link from "next/link";
import UserOnly from "@/components/utils/UserOnly";

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<RequireAuth>
			<UserOnly>
				<header className='bg-white shadow'>
					<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
						<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
							Profile dashboard
						</h1>
						<div className="mt-4">
							<span><Link className="bg-black p-3 text-white hover:bg-gray-800" href="/dashboard"> Dashboard </Link></span>
							<span><Link className="bg-black p-3 text-white hover:bg-gray-800" href="/dashboard/favourite"> Favourite </Link></span>
						</div>
					</div>
				</header>
				{children}
			</UserOnly>
		</RequireAuth>
	)
}

import { PasswordResetForm } from '@/components/forms';
import type { Metadata } from 'next';
import Image from "next/image";

export const metadata: Metadata = {
	title: 'FJob | Password reset',
}
export default function Page() {
	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<Image
					className='mx-auto h-10 w-auto'
					src="/img/logo.png"
					alt='FJob'
					width={100}
					height={100}
				/>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Reset your password
				</h2>
				<strong className="text-red-700">
					This option is not currently supported, contact us to change your credentials.
				</strong>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<PasswordResetForm />
			</div>
		</div>
	);
}

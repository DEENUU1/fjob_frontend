'use client';

import { useVerify } from '../../../../full-auth/hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Setup() {
	useVerify();

	return <ToastContainer />;
}

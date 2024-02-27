import {RequireAuth} from '@/components/utils';
import UserOnly from "@/components/utils/UserOnly";

interface Props {
  children: React.ReactNode;
}

export default function Layout({children}: Props) {
  return (
    <RequireAuth>
      <UserOnly>
        <header className='bg-white shadow'>
          <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              Profile dashboard
            </h1>
          </div>
        </header>
        {children}
      </UserOnly>
    </RequireAuth>
  )
}

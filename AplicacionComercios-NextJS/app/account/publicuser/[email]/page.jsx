"use client"

import Link from 'next/link'
import ComerceInfo from '@/components/ComerceInfo';
import PublicUserPage from '@/components/PublicUserPage';

async function UserComerce() {

    return (
        <div>
            <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <p className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Comercios</p>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <Link type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-2" href="../../login">Iniciar sesión</Link>
                        <Link type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-2" href="../../registro">Registrarse</Link>
                    </div>
                </div>
            </nav>

            <ComerceInfo />
            <PublicUserPage />
        </div>
    )
  
}
  
export default UserComerce
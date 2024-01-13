"use client"

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'

const getComercios = async () => {
    const res = await fetch("http://localhost:3000/api/signupcomerce")
    const data = await res.json()
    //console.log(data.comerce)
    return data.comerce
}

async function getValoracionComercio() {
    const res = await fetch("http://localhost:3000/api/valoracion")
    const data = await res.json()
    //console.log(data.comerce)
    return data.comerce
}

export default function ComerceCard() {
    const [comercios, setComercios] = useState([]);
    const [valoracion, setValoracion] = useState([]);
    const [searchCity, setSearchCity] = useState('');
    const [searchActivity, setSearchActivity] = useState('');
    const [sort, setSort] = useState(false);

    const router = useRouter()
    const pathName = usePathname()

    const redirigirComerce = (email) => {
        //console.log(redirigirComerce)
        const comerce={
            comercio: email,
        }
        //console.log(comerce)
        localStorage.setItem('email', email);
        
        fetch("/api/updateInfo/comerce", {
            method: "POST",
            headers: {
            //Authorization: `Bearer ${tokenJWT}`
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(comerce)
        })

        //alert("Redirigiendo...")
        if (pathName) {
            const path = pathName.split('/')[2]; // obtiene 'user', 'admin' o 'comerce'
            if(path == "user"){
                router.push(`${path}/${email}`)
            }else if(path == "publicuser"){
                router.push(`${path}/${email}`)
            }
            
        }
        
    }

    const sortedComercios = [...comercios];

    if (sort) {
        //alert("Ordenando comercios...")
        sortedComercios.sort((a, b) => {
            const valoracionA = valoracion.find(v => v.email === a.email);
            const valoracionB = valoracion.find(v => v.email === b.email);
            return (valoracionB ? valoracionB.puntuacion : 0) - (valoracionA ? valoracionA.puntuacion : 0);
        });
    }

    //console.log(sort);

    useEffect(() => {
        getComercios().then(setComercios);
        getValoracionComercio().then(setValoracion);
    }, []);

    return (
        <div>
            <div className="grid grid-cols-2 gap-3 ml-3 my-3">
                <div class="relative w-11/12 mt-3">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                        </svg>
                    </div>
                    <input type="text" placeholder="Buscar por ciudad" value={searchCity} onChange={(e) => setSearchCity(e.target.value)} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div class="relative w-11/12 mt-3">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                        </svg>
                    </div>
                    <input type="text" placeholder="Buscar por actividad" value={searchActivity} onChange={(e) => setSearchActivity(e.target.value)} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
            </div>
            <button type="button" onClick={() => setSort(!sort)} class="mx-3 my-3 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Ordenar por puntuación</button>
            <div className="grid grid-cols-2 gap-1">
                {sortedComercios.filter((comercio) => 
                    comercio.direccion && comercio.direccion.toLowerCase().includes(searchCity.toLowerCase()) && 
                    comercio.actividad && comercio.actividad.toLowerCase().includes(searchActivity.toLowerCase())
                ).map((comercio) => (
                    <div key={uuidv4()} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row w-11/12 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mx-3 my-3">
                        <Image src={`/img/${comercio.fotos}.jpg`} width={230} height={153} sizes="15vw" alt="Imagen no disponible"/>
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{comercio.nombreComercio}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{comercio.descripcion}</p>
                        </div>
                        <button onClick={() => redirigirComerce(comercio.email)} type="submit" className="w-1/6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-3">Leer más</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

//FUNCIONA CON BUSQUEDAS
// return (
//     <div>
//         <div className="grid grid-cols-2 gap-6 mx-3 my-3">
//             <div class="relative w-full mt-3">
//                 <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                     <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
//                     </svg>
//                 </div>
//                 <input type="text" placeholder="Buscar por ciudad" value={searchCity} onChange={(e) => setSearchCity(e.target.value)} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
//             </div>
//             <div class="relative w-full mt-3">
//                 <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                     <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
//                     </svg>
//                 </div>
//                 <input type="text" placeholder="Buscar por actividad" value={searchActivity} onChange={(e) => setSearchActivity(e.target.value)} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
//             </div>
//         </div>
//         <button class="text-gray-100" onClick={() => setSort(!sort)}>
//             Ordenar por puntuación
//         </button>
//         <div className="grid grid-cols-2 gap-1">
//             {sortedComercios.filter((comercio) => 
//                 comercio.direccion && comercio.direccion.toLowerCase().includes(searchCity.toLowerCase()) && 
//                 comercio.actividad && comercio.actividad.toLowerCase().includes(searchActivity.toLowerCase())
//             ).map((comercio) => (
//                 <div key={uuidv4()} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row w-11/12 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mx-3 my-3">
//                     <Image src={`/img/${comercio.fotos}.jpg`} width={230} height={153} sizes="15vw" alt="Imagen no disponible"/>
//                     <div className="flex flex-col justify-between p-4 leading-normal">
//                         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{comercio.nombreComercio}</h5>
//                         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{comercio.descripcion}</p>
//                     </div>
//                     <button onClick={() => redirigirComerce(comercio.email)} type="submit" className="w-1/6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-3">Leer más</button>
//                 </div>
//             ))}
//         </div>
//     </div>
// );
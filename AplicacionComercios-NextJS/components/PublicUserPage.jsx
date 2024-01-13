"use client"

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';

async function getValoracionComercio() {
    const res = await fetch("http://localhost:3000/api/valoracion")
    const data = await res.json()
    console.log(data.comerce)
    return data.comerce
}

export default function PublicUserPage() {

    const [valoracionComercioActual, setValoracionComercioActual] = useState([]);
    const [currentComerce, setCurrentComerce] = useState("");
    const pathName = usePathname()

    const cargarComerce = () => {
        //alert("Cargando comercio")
        
        if (pathName) {
            const path = pathName.split('/')[3]; // obtiene el email del comercio visitado
            setCurrentComerce(path);
            console.log(currentComerce)
            
        }
    }

    useEffect(() => {
        getValoracionComercio().then(data => setValoracionComercioActual(data || []));
        cargarComerce();
    }, []);

    return (
        <div className="p-4 mx-6">
            <div className=" px-3 py-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800 mx-1 my-1">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Valoracion:</h1>
                {valoracionComercioActual.filter(resumen => resumen.email === currentComerce).map((resumen) => (
                    <div key={uuidv4()}>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Puntuacion total: {resumen.puntuacion}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Lo recomiendan {resumen.positiva} personas</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">No lo recomiendan {resumen.negativa} personas</p>
                    </div>
                ))}
            </div>            
        </div>
        

    )
}
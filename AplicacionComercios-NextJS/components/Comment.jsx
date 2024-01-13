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

export default function Comment() {

    const [comentario, setComentario] = useState("");
    const [valoracionComercioActual, setValoracionComercioActual] = useState([]);
    const [currentComerce, setCurrentComerce] = useState("");
    const pathName = usePathname()

    const cargarComerce = () => {
        //alert("Cargando comercio")
        
        if (pathName) {
            const path = pathName.split('/')[3]; // obtiene el email del comercio visitado
            setCurrentComerce(path);
            //console.log(currentComerce)
            
        }
    }

    useEffect(() => {
        getValoracionComercio().then(data => setValoracionComercioActual(data || []));
        cargarComerce();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const comment = {
            comentario: comentario,
        };
        //console.log(comment);

        fetch("/api/comment", {
            method: "POST",
            headers: {
            //Authorization: `Bearer ${tokenJWT}`
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment)
        })

    };

    const recomendado = (event) => {
        //alert("Recomendado")
        event.preventDefault();
    
        fetch('/api/valoracion', {
            method: 'POST',
            headers: {
                //Authorization: `Bearer ${tokenJWT}`
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ valoracion: 'positiva' }),
        });
    };

    const noRecomendado = (event) => {
        //alert("Recomendado")
        event.preventDefault();
    
        fetch('/api/valoracion', {
            method: 'POST',
            headers: {
                //Authorization: `Bearer ${tokenJWT}`
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ valoracion: 'negativa' }),
        });
    };
    

    return (
        <div className="p-4 mx-6">
            <div className=" px-3 py-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800 mx-1 my-1">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Valoracion:</h1>
                {valoracionComercioActual && valoracionComercioActual.filter(resumen => resumen.email === currentComerce).map((resumen) => (
                    <div key={uuidv4()}>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Puntuacion total: {resumen.puntuacion}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Lo recomiendan {resumen.positiva} personas</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">No lo recomiendan {resumen.negativa} personas</p>
                    </div>
                ))}
            </div>
            <p className=" flex items-center justify-center my-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">¿Recomiendas este comercio?</p>
            <div className="flex items-center justify-center mt-3">
                <button onClick={recomendado} className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    <svg className="w-3.5 h-3.5 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                    </svg>
                    Recomendado
                </button>
                <button onClick={noRecomendado} className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 group ms-5">
                    <svg className="w-3.5 h-3.5 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M11.955 2.117h-.114C9.732 1.535 6.941.5 4.356.5c-1.4 0-1.592.526-1.879 1.316l-2.355 7A2 2 0 0 0 2 11.5h3.956L4.4 16a1.779 1.779 0 0 0 3.332 1.061 24.8 24.8 0 0 1 4.226-5.36l-.003-9.584ZM15 11h2a1 1 0 0 0 1-1V2a2 2 0 1 0-4 0v8a1 1 0 0 0 1 1Z"/>
                    </svg>
                    No recomendado
                </button>
            </div>
            <form className=" mt-3 space-y-4 md:space-y-6"  onSubmit={handleSubmit}>
                <label for="message" className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Añade tu reseña</label>
                <textarea onChange={(e) => setComentario(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cuentanos tu experiencia..."></textarea>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-3">Enviar</button>
            </form>
            
        </div>
        

    )
}
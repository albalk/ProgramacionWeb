"use client"

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'

const getComercios = async () => {
    const res = await fetch("http://localhost:3000/api/signupcomerce")
    const data = await res.json()
    //console.log(data.comerce)
    return data.comerce
}

const getComentarios = async () => {
    const res = await fetch("http://localhost:3000/api/comment")
    const data = await res.json()
    //console.log(data.comerce)
    return data.comerce
}

const getCurrentComerce = async () => {
    const res = await fetch("http://localhost:3000/api/currentUser")
    const data = await res.json()
    //console.log(data.comerce)
    return data.comerce
}

export default function ComerceData() {
    const [comercios, setComercios] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [currentComerce, setCurrentComerce] = useState("");

    useEffect(() => {
        getComercios().then(setComercios);
        getComentarios().then(setComentarios);
        getCurrentComerce().then(setCurrentComerce);
    }, []);

    return (
        <div>
            <div>
                {comercios.filter(resumen => resumen.email === currentComerce).map((resumen) => (
                    <div key={uuidv4()} className="mx-12 my-5">
                        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{resumen.nombreComercio}</h1>
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Actividad: {resumen.actividad}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Descripción: {resumen.descripcion}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Dirección: {resumen.direccion}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Contacto: {resumen.telefono}</p>
                        </div>
                        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Imagen</h1>
                        <Image src={`/img/${resumen.fotos}.jpg`} width={460} height={306} sizes="25vw" alt="Imagen no disponible"/>
                    </div>
                ))}
            </div>
            <div className=" mx-11 px-3 py-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800 my-1">
                <h1 className="mb-3 mx-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Reseñas y comentarios:</h1>
                {comentarios && comentarios.filter(resumen => resumen.comerce === currentComerce).map((resumen) => (
                    <div key={uuidv4()} className=" bg-white border border-gray-200 rounded-lg my-2">
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">{resumen.user}</p>
                            <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">{resumen.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
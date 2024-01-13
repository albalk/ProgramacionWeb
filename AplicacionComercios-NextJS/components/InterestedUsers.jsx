"use client"

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const getUsuarios = async () => {
    const res = await fetch("http://localhost:3000/api/signup")
    const data = await res.json()
    //console.log(data.comerce)
    return data.comerce
}

const getComercios = async () => {
    const res = await fetch("http://localhost:3000/api/signupcomerce")
    const data = await res.json()
    //console.log(data.comerce)
    return data.comerce
}

const getCurrentComerce = async () => {
    const res = await fetch("http://localhost:3000/api/currentUser")
    const data = await res.json()
    console.log(data.comerce)
    return data.comerce
}

export default function InterestedUsers() {
    const [usuarios, setUsuarios] = useState([]);
    const [comercios, setComercios] = useState([]);
    const [currentComerce, setCurrentComerce] = useState("");

    useEffect(() => {
        getUsuarios().then(setUsuarios);
        getComercios().then(setComercios);
        getCurrentComerce().then(setCurrentComerce);
    }, []);
    
    return (
        <div>
            <div className="mx-11 mt-3 px-3 py-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800 my-1">
                <h1 className="mb-3 mx-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Usuarios recomendados</h1>
                {usuarios && comercios && usuarios.filter(usuario => {
                    return usuario.offer === "on" && comercios.some(comercio => {
                        return comercio.email === currentComerce && usuario.city.toLowerCase() === comercio.direccion.toLowerCase();
                    });
                }).map((usuario) => (
                    <div key={uuidv4()}  className=" bg-white border border-gray-200 rounded-lg my-2">
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">Nombre: {usuario.name}</p>
                            <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">Ciudad: {usuario.city}</p>
                            <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">Contacto: {usuario.email}</p>
                            <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">Ofertas: {usuario.offer}</p>
                        </div>
                    </div>
                ))}


            </div>

        </div>
    )
}

//FUNCIONA SIN FILTRO POR CIUDAD
/* return (
        <div>
            <div className="mx-11 mt-3 px-3 py-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800 my-1">
                <h1 className="mb-3 mx-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Usuarios recomendados</h1>
                {usuarios && usuarios.filter(usuario => usuario.offer === "on").map((usuario) => (
                    <div key={uuidv4()}  className=" bg-white border border-gray-200 rounded-lg my-2">
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">Nombre: {usuario.name}</p>
                            <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">Ciudad: {usuario.city}</p>
                            <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">Contacto: {usuario.email}</p>
                            <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">Ofertas: {usuario.offer}</p>
                        </div>
                        
                    </div>
                ))}
            </div>

        </div>
    ) */
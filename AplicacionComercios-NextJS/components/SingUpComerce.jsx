"use client"

import { useState } from 'react';

export default function SignUpComerce() {
    const [email, setEmail] = useState("");
    const [nombreComercio, setNombreComercio] = useState("");
    const [cif, setCif] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const comercio = {
            type: "CO",
            nombreComercio: nombreComercio,
            cif: cif,
            direccion: direccion,
            email: email,
            telefono: telefono,
            password: "contraseña", // Contraseña por defecto
            actividad: "default", // actividad por defecto
            descripcion: "default", // descripcion por defecto
            fotos: "default", // imgs por defecto
        };

        fetch("/api/signupcomerce", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comercio)
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
            alert("Añadiendo comercio...")
            location.reload(true);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Dar de alta un comercio
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del comercio</label>
                                <input onChange={(e) => setNombreComercio(e.target.value)} type="text" name="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ejemplo"></input>
                            </div>
                            <div>
                                <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CIF</label>
                                <input onChange={(e) => setCif(e.target.value)} type="text" name="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="000000000"></input>
                            </div>
                            <div>
                                <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
                                <input onChange={(e) => setDireccion(e.target.value)} type="text" name="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ciudad"></input>
                            </div>
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""></input>
                            </div>
                            <div>
                                <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono de contacto</label>
                                <input onChange={(e) => setTelefono(e.target.value)} type="text" name="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="987654321"></input>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Aceptar</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
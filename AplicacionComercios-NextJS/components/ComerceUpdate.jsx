"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import SideBar from '@/components/SideBar';

export default function ComerceUpdate() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [nombreComercio, setName] = useState("");
    const [password, setPassword] = useState("");
    const [direccion, setDireccion] = useState("");
    const [actividad, setActividad] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fotos, setFotos] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/updateInfo/comerce', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombreComercio,
                email,
                password,
                direccion,
                actividad,
                descripcion,
                fotos,
            }),
        });

        const data = await response.json();
        console.log(data);

    };

    const [emailDelete, setEmailDelete] = useState("");
    const [passwordDelete, setPasswordDelete] = useState("");

    const handleSubmitDelete = async (event) => {
        event.preventDefault();
        alert("Eliminando cuenta...");
        fetch('/api/updateInfo/comerce', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },body: JSON.stringify({
                emailDelete,
                passwordDelete,
            }),
        })
        alert("Cuenta eliminada");
        router.push("../..");
    };

    return (
        <div>
            <SideBar />
            <div class="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Modifica tus datos
                    </h1>
                    <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label for="email1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirma tu email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email1" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""></input>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <label for="text1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de tu comercio</label>
                                <input onChange={(e) => setName(e.target.value)} type="text" name="text" id="text1" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ejemplo" required=""></input>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <label for="text2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ciudad</label>
                                <input onChange={(e) => setDireccion(e.target.value)} type="text" name="text" id="text2" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Madrid" required=""></input>
                            </div>
                            <div>
                                <label for="text3" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Actividad</label>
                                <input onChange={(e) => setActividad(e.target.value)} type="text" name="text" id="text3" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Restauracion" required=""></input>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <label for="text4" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                                <input onChange={(e) => setDescripcion(e.target.value)} type="text" name="text" id="text4" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ejemplo" required=""></input>
                            </div>
                            <div>
                                <label for="text5" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fotos</label>
                                <input onChange={(e) => setFotos(e.target.value)} type="text" name="text" id="text5" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="img.jpg" required=""></input>
                            </div>
                        </div>
                        
                        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Actualizar</button>
                    </form>
                </div>              
            </div>
            <div class="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Eliminar cuenta
                    </h1>
                    <form class="space-y-4 md:space-y-6" onSubmit={handleSubmitDelete}>
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <label for="email2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirma tu email</label>
                                <input onChange={(e) => setEmailDelete(e.target.value)} type="email" name="email" id="email2" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""></input>
                            </div>
                            <div>
                                <label for="password2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirma tu contraseña</label>
                                <input onChange={(e) => setPasswordDelete(e.target.value)} type="password" name="password" id="password2" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                            </div>
                        </div>
                        <button type="submit" class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Eliminar</button>
                    </form>
                </div>              
            </div>
        </div>
    )
}
"use client"

import { v4 as uuidv4 } from 'uuid';

async function getComercios() {
    const res = await fetch("http://localhost:3000/api/signupcomerce")
    const data = await res.json()
    console.log(data.comerce)
    return data.comerce
}

const deleteComercio = async (comerceId) => {
    alert("Eliminando comercio...")
    fetch("/api/signupcomerce", {
      method: "DELETE",
      headers: {
      //Authorization: `Bearer ${tokenJWT}`
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(comerceId)
    })
    location.reload(true);
};

export default async function ComerceList() {

    const comercios = await getComercios()

    return (
        <section class="bg-gray-50 dark:bg-gray-900 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 md:h-screen">
            <div class="items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <ul>
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Lista de comercios
                    </h1><br></br>
                    {comercios && comercios.map((comercio) => (
                        <li key={uuidv4()} className="bg-slate-400 mb-2 p-4 rounded-md text-back flex justify-between">
                                <h3 className="font-bold">{comercio.nombreComercio}</h3>
                                <p>{comercio.email}</p>
                                <button onClick={() => deleteComercio(comercio)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
            {/* <h2>HOLA</h2> */}
        </section>
    )
}
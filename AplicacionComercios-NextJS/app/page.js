import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className="w-2/3 mx-64 my-10">
        <h1 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Proyecto final</h1>
        <p className="mb-6 text-lg font-normal text-center text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Todos los comercios que imaginas, al alcance de tus manos</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center items-center w-2/3 mx-64 my-6 ">
        <div className="grid gap-4">
            <div>
                <img className="h-full max-w-full  rounded-lg" src="img/bar1.jpg" alt="img"></img>
            </div>
            <div>
                <img className="h-full max-w-full rounded-lg" src="img/bolera1.jpg" alt="img"></img>
            </div>
            <div>
                <img className="h-full max-w-full rounded-lg" src="img/cine1.jpg" alt="img"></img>
            </div>
        </div>
        <div className="grid gap-4">
            <div>
                <img className="h-full max-w-full rounded-lg" src="img/super1.jpg" alt="img"></img>
            </div>
            <div>
                <img className="h-full max-w-full rounded-lg" src="img/restaurante3.jpg" alt="img"></img>
            </div>
            <div>
                <img className="h-full max-w-full rounded-lg" src="img/cine2.jpg" alt="img"></img>
            </div>
        </div>
        <div className="grid gap-4">
            <div>
                <img className="h-full max-w-full rounded-lg" src="img/restaurante1.jpg" alt="img"></img>
            </div>
            <div>
                <img className="h-full max-w-full rounded-lg" src="img/bar2.jpg" alt="img"></img>
            </div>
            <div>
                <img className="h-full max-w-full rounded-lg" src="img/tienda2.jpg" alt="img"></img>
            </div>
        </div>
        <div className="grid gap-4">
            <div>
                <img className="h-full max-w-full rounded-lg" src="img/tienda1.jpg" alt="img"></img>
            </div>
            <div>
                <img className="h-full max-w-full rounded-lg" src="img/restaurante2.jpg" alt="img"></img>
            </div>
            <div>
                <img className="h-full max-w-full rounded-lg" src="img/super2.jpg" alt="img"></img>
            </div>
        </div>
      </div>

      <div className="flex justify-center items-center my-6">
        <Link type="submit" className="w-3xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href="login">Iniciar Sesión</Link>
        <Link type="submit" className="w-3xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href="registro">Registrarse</Link>
        <Link type="submit" className="w-3xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href="account/publicuser">Continuar sin cuenta</Link>
      </div>
    </div>
  )
}

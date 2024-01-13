import SideBar from "@/components/SideBar"
import Comment from "@/components/Comment"
import ComerceCard from "@/components/comerceCard"

async function UserAccount() {

    return (
        <div>
            <SideBar />
            <div className="p-4 sm:ml-64">
            <h1 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white my-3">Listado de comercios</h1>
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <ComerceCard />
                </div>
            </div>
        </div>
    )
  
}
  
export default UserAccount
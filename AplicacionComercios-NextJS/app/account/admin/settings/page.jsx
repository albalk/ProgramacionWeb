import SideBar from "@/components/SideBar"
import SingUpComerce from "@/components/SingUpComerce"
import ComerceList from '@/components/ComerceList'

async function AdminSettings() {

    return (
        <div>
            <SideBar />
            <div class="grid grid-cols-2 p-4 sm:ml-64 mb-5">
                <SingUpComerce />                
                <ComerceList />
            </div>
        </div>
    )
  
}
  
export default AdminSettings
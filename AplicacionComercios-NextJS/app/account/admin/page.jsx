import SideBar from "@/components/SideBar"
import SingUpComerce from "@/components/SingUpComerce"
import ComerceList from '@/components/ComerceList'
import ComerceCardAdmin from "@/components/comerceCardAdmin"

async function AdminAccount() {

    return (
        <div>
            <SideBar />
            <div className="ml-64">
                {/* <ComerceCard /> */}
                <ComerceCardAdmin />
            </div>
            
        </div>
    )
  
}
  
export default AdminAccount
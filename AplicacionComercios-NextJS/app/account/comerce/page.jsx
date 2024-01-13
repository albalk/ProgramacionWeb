import SideBar from "@/components/SideBar"
import ComerceData from "@/components/ComerceData"
import InterestedUsers from "@/components/InterestedUsers"
async function ComerceAccount() {

    return (
        <div className="ml-64">
            <SideBar />
            <ComerceData />
            <InterestedUsers />
        </div>
    )
  
}
  
export default ComerceAccount
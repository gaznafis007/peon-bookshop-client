import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../../api/AuthProvider";
import useAdmin from "../../../Hooks/useAdmin/useAdmin";
import Loading from "../../../Components/Loading";


const DashboardDrawer = () => {
    const {user,loading} = useContext(AuthContext)
    const [isAdmin,isAdminLoading] = useAdmin(user?.email)
    if(loading || isAdminLoading){
        return (
            <Loading/>
        )
    }
    return (
        <>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col p-6">
    {/* Page content here */}
    <Outlet/>
    
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content capitalize">
      {/* Sidebar content here */}
      <li><Link to="/dashboard">profile</Link></li>
      <li><Link to="/dashboard/myOrders">my orders</Link></li>
      {
        isAdmin && (
          <>
            <li><Link to="/dashboard/allUsers">All users</Link></li>
            <li><Link to="/dashboard/allOrders">All Orders</Link></li>
            <li><Link to="/dashboard/manageBooks">Manage Books</Link></li>
          </>
        )
      }
    </ul>
  
  </div>
</div>
        </>
    );
};

export default DashboardDrawer;
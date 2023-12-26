import { useContext } from "react";
import { AuthContext } from "../../api/AuthProvider";
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user,logOut,loading} = useContext(AuthContext)
    const [isAdmin,isAdminLoading] = useAdmin(user?.email)
    const location = useLocation()
    if(loading || isAdminLoading){
        return (
            <h2 className="text-5xl text-green-600 text-center">Loading...</h2>
        )
    }
    if(user?.uid && isAdmin){
        return children
    }
    logOut()
    return (
        <Navigate to="/signin" from={{state:location}}></Navigate>
    );
};

export default AdminRoute;
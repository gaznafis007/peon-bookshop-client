import { useContext } from "react";
import { AuthContext } from "../../api/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return (
            <h2 className="text-5xl text-green-600 text-center">Loading...</h2>
        )
    }
    if(user?.uid){
        return children
    }
    return (
        <Navigate to="/signin" from={{state:location}} replace></Navigate>
    );
};

export default PrivateRoute;
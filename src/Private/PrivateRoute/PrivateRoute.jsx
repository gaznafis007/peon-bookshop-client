import { useContext } from "react";
import { AuthContext } from "../../api/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../Components/Loading";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return (
            <Loading></Loading>
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
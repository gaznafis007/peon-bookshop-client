import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import {AuthContext} from "../../../api/AuthProvider"


const MyOrders = () => {
    const {user} = useContext(AuthContext)
    const {data:orders, isLoading} = useQuery({
        queryKey:["orders"],
        queryFn: async()=>{
            const res = await fetch(`http://localhost:5000/orders?email=${user.email}`,{
                headers:{
                    authorization:`bearer ${localStorage.getItem("peonKey")}`
                }
            })
            const data = await res.json();
            return data
        }
    })
    if(isLoading){
        return <h2 className="text-5xl text-green-600 text-center">Loading...</h2>
    }
    return (
        <div>
            <h2 className="text-5xl text-blue-600 font-semibold">My orders</h2>
            {orders.length == 0 && <p className="mt-4 text-3xl text-blue-600 font-semibold">No order yet</p>}
            <table className="table mt-4">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Book Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Amount to be paid</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map((order,index) => (
                        <tr key={order?._id}>
                            <th>{index + 1}</th>
                            <td>{order.userName}</td>
                            <td>{order.bookName}</td>
                            <td>{order.userEmail}</td>
                            <td>{order.phoneNumber}</td>
                            <td>{order.bookPrice}</td>
                            <td>{order.address}</td> 
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;
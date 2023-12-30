import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";


const AllOrders = () => {
    const {data:orders, isLoading, refetch} = useQuery({
        queryKey:["allOrders"],
        queryFn:async()=>{
            const res = await fetch("https://peon-bookshop-server.vercel.app/allOrders",{
                headers:{
                    authorization:`bearer ${localStorage.getItem("peonKey")}`
                }
            });
            const data = await res.json();
            console.log(data)
            return data
        }
    })
    const handleStatus = order =>{
        fetch(`https://peon-bookshop-server.vercel.app/orders/${order._id}`,{
            method:'PUT',
            headers:{
                authorization:`bearer ${localStorage.getItem("peonKey")}`
            }
        })
        .then(res=>res.json())
        .then(data =>{
            console.log(data);
            refetch()
        })
    }
    const handleDelete = order =>{
        fetch(`https://peon-bookshop-server.vercel.app/orders/${order._id}`,{
            method:'DELETE',
            headers:{
                authorization:`bearer ${localStorage.getItem("peonKey")}`
            }
        })
        .then(res=>res.json())
        .then(data =>{
            console.log(data);
            refetch()
        })
    }
    if(isLoading){
        return <Loading/>
    }
    return (
        <div>
            <h2 className="text-4xl">All Orders</h2>
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
                    <th>Status</th>
                    <th>Delete Order</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map((order,index) => (
                        <tr key={order._id}>
                            <th>{index + 1}</th>
                            <td>{order.userName}</td>
                            <td>{order.bookName}</td>
                            <td>{order.userEmail}</td>
                            <td>{order.phoneNumber}</td>
                            <td>{order.bookPrice}</td>
                            <td>{order.address}</td> 
                            <td>
                                {
                                    order?. status ? <spa className="text-green-500 font-semibold">Delivered</spa>  :<button className="btn btn-sm btn-outline-primary border-2 border-blue-600" onClick={()=>handleStatus(order)}>Not Delivered</button>
                                }
                            </td> 
                            <td>
                                <button onClick={()=>handleDelete(order)} className="btn btn-sm btn-error">Delete</button>
                            </td> 
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default AllOrders;
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";



const AllUsers = () => {

    const {data:users,isLoading, refetch} = useQuery({
        queryKey:["users"],
        queryFn: async()=>{
            const res = await  fetch("https://peon-bookshop-server.vercel.app/users",{
                headers:{
                    authorization: `bearer ${localStorage.getItem("peonKey")}`
                }
            })
            const data = await res.json();
            return data
        }
    })
    const handleDelete = id =>{
        fetch(`https://peon-bookshop-server.vercel.app/users/${id}`,{
            method:'DELETE',
            headers:{
                authorization:`bearer ${localStorage.getItem("peonKey")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.deletedCount > 0){
                Swal.fire({
                    icon: "error",
                    title: "User deleted successfully"
                })
                refetch()
            }
        })
    }
    const handleMakeAdmin = id =>{
        fetch(`https://peon-bookshop-server.vercel.app/users/${id}`,{
            method:'PUT',
            headers:{
                authorization: `bearer ${localStorage.getItem("peonKey")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data?.modifiedCount > 0){
                Swal.fire({
                    icon: "success",
                    title: "User is Admin now!"
                })
                refetch()
            }
        })
    }
    
    if(isLoading){
        return (
            <h2 className="text-4xl text-green-600 text-center">Loading...</h2>
        )
    }
    if(users?.message){
        return <h2 className="text-4xl text-error font-semibold">{users?.message}</h2>
    }
    return (
        <>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user,index) => (
            <tr key={user?._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    {
                        user?.role === 'admin' ?
                        "Admin"
                        :
                        <button onClick={()=>handleMakeAdmin(user?._id)} className="btn btn-outline btn-sm hover:text-white hover:bg-blue-600 border-blue-600">Make Admin</button>
                    }
                </td>
                <td>
                    <button onClick={()=>handleDelete(user?._id)} className="btn btn-error btn-sm">Delete User</button>
                </td>
            </tr>
        ))
      }
    </tbody>
  </table>
</div>   
        </>
    );
};

export default AllUsers;
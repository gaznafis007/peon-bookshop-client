import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading";


const ManageBooks = () => {
    const [page,setPage] = useState(0);
    const {data,isLoading,refetch} = useQuery({
        queryKey:['allBooks', page],
        queryFn: async() =>{
            const res= await fetch(`https://peon-bookshop-server.vercel.app/allBooks?page=${page}`);
            const data = await res.json();
            return data
        }
    })
    const handleDeleteBook = book =>{
        fetch(`https://peon-bookshop-server.vercel.app/books/${book._id}`,{
            method:'DELETE',
            headers:{
                authorization: `bearer ${localStorage.getItem("peonKey")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.deletedCount > 0){
                Swal.fire({
                    icon:"success",
                    title:`Deleted Successfully`
                })
                refetch()
            }
        })
    }
    const handlePrev = () =>{
        if(page>0){
            let currentPrevPage = page - 1;
            setPage(currentPrevPage)
        }
    }
    const handleNext = () =>{
        let currentNextPage = page + 1;
        setPage(currentNextPage)
    }
    if(isLoading){
        return (
            <Loading/>
        )
    }
    return (
        <div>
            <h2 className="text-4xl text-blue-600 font-semibold">Manage Books</h2>
            {
                data.message ? <h2 className="text-2xl text-error">{data.message}</h2>
                :
                (
                <table className="table mt-4">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Price (USD)</th>
                    <th>Quantity</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    data?.books.map((book, index) => (
                        <tr key={book?._id}>
                            <th>{index+1}</th>
                            <td>{book?.book_title}</td>
                            <td>{book?.book_author}</td>
                            <td>{book?.book_price}</td>
                            <td>{book?.qty}</td>
                            <td>
                            <Link to={`/books/${book?._id}`} className="btn btn-sm btn-outline btn-primary border-blue-600">Edit</Link>
                            </td>
                            <td>
                            <button onClick={()=>handleDeleteBook(book)} className="btn btn-sm btn-error">Delete</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
    )
            }
        <div className="flex flex-row justify-between lg:w-2/3 mx-auto mt-4">
            <button onClick={handlePrev} className="btn">prev</button>
            <button onClick={handleNext} className="btn">next</button>
        </div>
        <div className="mt-6">
            <Link to="/dashboard/addNewBook" className="btn bg-blue-600 hover:bg-blue-900 text-white md:w-1/3 capitalize"> add new book</Link>
        </div>
        </div>
    );
};

export default ManageBooks;
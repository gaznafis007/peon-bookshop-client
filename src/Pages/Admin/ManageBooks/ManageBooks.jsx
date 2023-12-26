import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


const ManageBooks = () => {
    const [page,setPage] = useState(0);
    const {data,isLoading} = useQuery({
        queryKey:['allBooks', page],
        queryFn: async() =>{
            const res= await fetch(`http://localhost:5000/allBooks?page=${page}`);
            const data = await res.json();
            return data
        }
    })
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
            <h2 className="text-5xl text-green-600">Loading...</h2>
        )
    }
    return (
        <div>
            <h2 className="text-4xl text-blue-600 font-semibold">Manage Books</h2>
            {
                data.message ? <h2 className="text-2xl text-error">{data.message}</h2>
                :
                (
                <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Price</th>
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
                            <td>
                            <button className="btn btn-sm btn-outline btn-primary border-blue-600">Edit</button>
                            </td>
                            <td>
                            <button className="btn btn-sm btn-error">Delete</button>
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
        </div>
    );
};

export default ManageBooks;
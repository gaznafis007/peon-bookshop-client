import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../api/AuthProvider";
import Card from "../../Components/Card";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ViewCart = () => {
    const {user} = useContext(AuthContext)
    const {data:cartBooks, isLoading, refetch} = useQuery({
        queryKey:["wishlist", user.email],
        queryFn: async()=>{
            const res = await fetch(`http://localhost:5000/wishlist?email=${user.email}`,{
                headers:{
                    authorization:`bearer ${localStorage.getItem("peonKey")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    const deleteBookFromCart = id =>{
        fetch(`http://localhost:5000/wishlist/${id}`,{
            method: 'DELETE',
            headers:{
                authorization: `Bearer ${localStorage.getItem("peonKey")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount >0){
                Swal.fire({
                    icon: "error",
                    title: "Item Deleted Successfully",
                  });
                refetch()
            }
        })
    }
    if(isLoading){
        return (
            <h2 className="text-green-600 text-5xl text-center">Loading...</h2>
        )
    }
    return (
        <div className="my-4">
            <h2 className="text-4xl text-blue-600">Your Cart</h2>
            {
                cartBooks.length > 0
                ?
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gep-4 mt-4 p-4">
                {
                    cartBooks.map((cartBook) => (
                        <Card key={cartBook._id} object={cartBook} title={cartBook.wishlistBookTitle} image_url={cartBook.wishlistBookImageUrl} primaryAction={"Buy Now"} secondaryAction={"Delete from cart"} subtitle={cartBook.wishlistBookAuthor} extras={`${cartBook.wishlistBookPrice} USD`} link={`/books/${cartBook.wishlistBookId}`} secondaryActionMethod={deleteBookFromCart}></Card>
                    ))
                }
            </div>
            :
            <div className="mt-4 p-4">
                <h2 className=" text-center">No books in cart.
                <Link className="text-blue-600 font-semibold" to="/books"> Explore Books</Link>
                </h2>
            </div>
            }
        </div>
    );
};

export default ViewCart;

import { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../api/AuthProvider';
import Swal from 'sweetalert2';
import useAdmin from '../../../Hooks/useAdmin/useAdmin';
import BookModal from '../BookModal/BookModal';
import SingleLoading from "../../../Components/SingleLoading"

const BookDetails = () => {
    const book = useLoaderData()
    const {user} = useContext(AuthContext)
    const [isAdmin,isAdminLoading] = useAdmin(user?.email)
    const [isModalOpen,setIsModalOpen] = useState(false)
    console.log(isModalOpen)
    const handleModal = ()=>{
        setIsModalOpen(!isModalOpen);
        console.log(isModalOpen)
    }
    const addToCart = id =>{
        if(!user){
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to login, first",
                footer: `<a href="/signin"> Please sign in to add this book to cart</a>`
              });
        }
        else{
            fetch(`https://peon-bookshop-server.vercel.app/wishlist?id=${id}&email=${user?.email}`,{
            method: 'POST',
            headers:{
                authorization: `bearer ${localStorage.getItem("peonKey")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                Swal.fire({
                    icon: "success",
                    title: "Congrats",
                    text: "Book added to the cart",
                  });
            }
        })
        }
    }
    if(isAdminLoading){
        return (
            <SingleLoading/>
        )
    }
    return (
        <>
            <div className="bg-base=300 mt-4 p-4">
        <h2 className="text-4xl text-center text-blue-600">{book?.book_title}</h2>
        <img src={book?.book_image_url} className='mx-auto my-4 shadow-lg' />
        <p className="text-gray-500 text-lg font-semibold capitalize text-center">{book?.book_author}</p>
        <p className="text-gray-400 text-xl text-start  mx-2 lg:mx-auto">{book?.book_publisher}</p>
        <p className="text-gray-400 text-xl text-start  mx-2 lg:mx-auto">{book?.book_genre}</p>
        <p className="text-gray-400 text-xl text-start  mx-2 lg:mx-auto">Price: {book?.book_price}USD</p>
        <p className="mt-3 text-start mx-2 lg:mx-auto">
            {book?.book_description}
        </p>
        <p className="flex-col gap-4">
            <button onClick={()=>addToCart(book._id)} className="btn block w-full my-4 btn-outline">Add to cart</button>
            {/* <button className="btn block w-full my-4 btn-primary text-white bg-blue-600">Buy Now</button> */}
            <label onClick={handleModal} htmlFor="book_modal" className="btn w-full my-4 btn-primary text-white bg-blue-600">Buy Now</label>
            {
                isAdmin &&
                <button className="btn block w-full my-4 btn-outline">Edit Book Detail</button>
            }
        </p>
        </div>
        {isModalOpen && <BookModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} book={book}></BookModal>}
        </>
    );
};

export default BookDetails;
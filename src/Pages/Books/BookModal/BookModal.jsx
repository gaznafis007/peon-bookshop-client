import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../api/AuthProvider";


const BookModal = ({setIsModalOpen,isModalOpen, book}) => {
    const {user} = useContext(AuthContext)
    const {register,handleSubmit, reset, formState:{errors}} = useForm()
    const handleOrder = data =>{
        console.log(data)
        const orderDetail = {
            userName: data.userName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            bookName: book.book_title,
            bookPublisher: book.book_publisher,
            bookGenre: book.book_genre,
            bookId: book._id,
            bookImage: book.book_image_url,
            bookPrice: book.book_price * data.qty,
            userEmail: user.email,
            orderQty: data.qty
        }
        fetch(`https://peon-bookshop-server.vercel.app/orders`, {
            method: 'PUT',
            headers:{
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem("peonKey")}`
            },
            body: JSON.stringify(orderDetail)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.result.acknowledged){
                reset()
                Swal.fire({
                    icon: "success",
                    title: "Order is placed"
                })
                
            }
        })
        
    }
    return (
        <>
           <input type="checkbox" id="book_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                    <div className="modal-box">
                        <button onClick={()=>setIsModalOpen(!isModalOpen)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                        <h3 className="text-lg text-blue-600 font-bold">Provide Information!</h3>
                        {user?.uid ? 
                            <>
                                <form className="card-body" onSubmit={handleSubmit(handleOrder)}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Receiver Name</span>
                                        </label>
                                        <input type="text" className="input input-bordered max-w-sm" {...register("userName",{required:{
                                            value:true,
                                            message:"Name is Required"
                                        }})} />
                                        {errors.userName && <p className="text-error">{errors.userName.message}</p>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Book Name</span>
                                        </label>
                                        <input readOnly type="text" defaultValue={book.book_title} className="input input-bordered max-w-sm" {...register("bookName")} />

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Author Name</span>
                                        </label>
                                        <input readOnly type="text" value={book.book_author} className="input input-bordered max-w-sm" {...register("authorName")} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Book Price</span>
                                        </label>
                                        <input readOnly type="text" value={book.book_price} className="input input-bordered max-w-sm" {...register("price")} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Phone Number</span>
                                        </label>
                                        <input type="text" className="input input-bordered max-w-sm" {...register("phoneNumber",{required:{
                                            value:true,
                                            message:"Phone Number is Required"
                                        }})} />
                                        {errors.phoneNumber && <p className="text-error">{errors.phoneNumber.message}</p>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Quantity</span>
                                        </label>
                                        <input type="number" className="input input-bordered max-w-sm" {...register("qty",{required:{
                                            value:true,
                                            message:"Quantity is Required"
                                        }})} />
                                        {errors.qty && <p className="text-error">{errors.qty.message}</p>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Address</span>
                                        </label>
                                        <textarea type="text" className="textarea textarea-bordered max-w-sm" {...register("address",{required:{
                                            value:true,
                                            message:"Address is Required"
                                        }})}></textarea>
                                        {errors.address && <p className="text-error">{errors.address.message}</p>}
                                    </div>
                                    <div className="form-control mt-4">
                                        <input type="submit" value="Place order" className="btn btn-primary bg-blue-600 text-white" />
                                    </div>
                                </form>
                            </>
                        :
                        <Link className="text-link" to="/signin">Please Log in to buy books</Link>
                    }
                    </div>
            </div> 
        </>
    );
};

export default BookModal;
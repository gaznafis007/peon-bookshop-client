import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const AddNewBooks = () => {
    const {register,handleSubmit, reset, formState:{errors}} = useForm()
    const handleAddBook = data =>{
        const formData = new FormData()
        formData.append('image', data.image[0])
        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_KEY}`,{
            method: 'POST',
            body: formData
        })
        .then(res=>res.json())
        .then(imgData=>{
            if(imgData.success){
                const bookInfo = {
                    book_title: data.book_title,
                    book_author: data.book_author,
                    book_publisher:data.book_publisher,
                    book_price:parseFloat(data.book_price),
                    book_genre:data.book_genre,
                    book_image_url:imgData.data.image.url,
                    book_description:data.book_description,
                    qty:parseInt(data.qty)
                }
                fetch(`https://peon-bookshop-server.vercel.app/books`,{
                    method:'POST',
                    headers:{
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem("peonKey")}`
                    },
                    body: JSON.stringify(bookInfo)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    if(data.acknowledged){
                        Swal.fire({
                            icon:"success",
                            title:"Book Added Successfully"
                        })
                        reset()
                    }
                })
            }
        })
    }
    return (
        <div>
            <p className="text-4xl">Add new Books</p>
            <form onSubmit={handleSubmit(handleAddBook)} className="mt-8 lg:w-2/3 mx-auto card-body">
                <div className="form-control">
                    <label htmlFor="" className="label">
                        <span className="label-text font-semibold">Book Title</span>
                    </label>
                    <input type="text" placeholder="Write Book Name" className="input input-bordered max-w-sm" {...register("book_title",{
                        required:{
                            value:true,
                            message: "Title is required"
                        }
                    })} />
                    {errors.book_title && <p className="mt-2 text-error">{errors.book_title.message}</p>}
                </div>
                <div className="form-control">
                    <label htmlFor="" className="label">
                        <span className="label-text font-semibold">Author</span>
                    </label>
                    <input type="text" placeholder="Write Author Name" className="input input-bordered max-w-sm" {...register("book_author",{
                        required:{
                            value:true,
                            message:"Author name required"
                        }
                    })} />
                    {errors.book_author && <p className="mt-2 text-error">{errors.book_author.message}</p>}
                </div>
                <div className="form-control">
                    <label htmlFor="" className="label">
                        <span className="label-text font-semibold">Publisher</span>
                    </label>
                    <input type="text" placeholder="Write Publisher Name" className="input input-bordered max-w-sm" {...register("book_publisher",{
                        required:{
                            value:true,
                            message:"Publisher is required"
                        }
                    })} />
                    {errors.book_publisher && <p className="mt-2 text-error">{errors.book_publisher.message}</p>}
                </div>
                <div className="form-control">
                    <label htmlFor="" className="label">
                        <span className="label-text font-semibold">Genre</span>
                    </label>
                    <input type="text" placeholder="Genre" className="input input-bordered max-w-sm" {...register("book_genre",{
                        required:{
                            value:true,
                            message:"Genre is required"
                        }
                    })} />
                    {errors.book_genre && <p className="mt-2 text-error">{errors.book_genre.message}</p>}
                </div>
                <div className="form-control">
                    <label htmlFor="" className="label">
                        <span className="label-text font-semibold">Price</span>
                    </label>
                    <input type="text" placeholder="Price in USD" className="input input-bordered max-w-sm" {...register("book_price",{
                        required:{
                            value:true,
                            message:"Price is required"
                        }
                    })} />
                    {errors.book_price && <p className="mt-2 text-error">{errors.book_price.message}</p>}
                </div>
                <div className="form-control">
                    <label htmlFor="" className="label">
                        <span className="label-text font-semibold">Quantity</span>
                    </label>
                    <input type="text" placeholder="Enter quantity" className="input input-bordered max-w-sm" {...register("qty",{
                        required:{
                            value:true,
                            message:"Quantity is required"
                        }
                    })} />
                    {errors.qty && <p className="mt-2 text-error">{errors.qty.message}</p>}
                </div>
                <div className="form-control">
                    <label htmlFor="" className="label">
                        <span className="label-text font-semibold">Book Cover</span>
                    </label>
                    <input type="file"  className="file-input file-input-bordered max-w-sm" {...register("image",{
                        required:{
                            value:true,
                            message:"Image is required"
                        }
                    })} />
                    {errors.image && <p className="mt-2 text-error">{errors.image.message}</p>}
                </div>
                <div className="form-control">
                    <label htmlFor="" className="label">
                        <span className="label-text font-semibold">Description</span>
                    </label>
                    <textarea type="text" placeholder="Write Book Description" className="textarea textarea-bordered max-w-sm" {...register("book_description",{
                        required:{
                            value:true,
                            message:"Description is required"
                        }
                    })}></textarea>
                    {errors.book_description && <p className="mt-2 text-error">{errors.book_description.message}</p>}
                </div>
                <div className="form-control mt-4">
                    <input type="submit" value={"Submit"} className="btn btn-outline-primary max-w-sm border-2 border-blue-600 "/>
                </div>
            </form>
        </div>
    );
};

export default AddNewBooks;
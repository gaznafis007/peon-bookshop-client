import { useContext } from "react";
import { AuthContext } from "../../../api/AuthProvider";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreateBookReviews = ({refetch}) => {
    const {user} = useContext(AuthContext)
    const {register,handleSubmit, reset , formState:{errors}} = useForm()
    const handleCreateBookReview = data =>{
        console.log(data)
        const bookName = data.bookName;
        const authorName = data.authorName;
        const reviewTitle = data.reviewTitle
        const reviewText = data.reviewText;
        const formData = new FormData()
        formData.append('image', data.image[0]);
        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_KEY}`,{
            method: 'POST',
            body: formData
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                console.log(data.data.image.url)
                const bookReview = {
                    userName: user?.displayName,
                    userEmail: user?.email,
                    bookName,
                    authorName,
                    reviewTitle,
                    reviewText,
                    image_url: data.data.image.url
                }
                fetch('https://peon-bookshop-server.vercel.app/bookReview',{
                    method: "POST",
                    headers:{
                        'content-type':'application/json',
                        authorization: `bearer ${localStorage.getItem("peonKey")}`
                    },
                    body: JSON.stringify(bookReview)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    if(data.acknowledged){
                        reset()
                        refetch()
                    }
                })
            }
        })
        
    }
    return (
        <div className="my-4 mx-auto p-4 shadow-xl rounded-md lg:w-1/4">
            {
                user?.uid ?
                <form onSubmit={handleSubmit(handleCreateBookReview)} className="card-body">
                <h2 className="card-title text-blue-600 font-bold">Write your review</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-blue-600 font-semibold">Book Name</span>
                    </label>
                    <input {...register("bookName", {
                        required:{
                            value:true,
                            message:"Book name is rquired"
                        }
                    })} type="text" name="bookName" className="input input-bordered input-primary border-blue-600 w-full max-w-xs" />
                    {errors?.bookName && <p className="text-error font-semibold">{errors?.bookName.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-blue-600 font-semibold">Author Name</span>
                    </label>
                    <input {...register("authorName",{
                        required:{
                            value:true,
                            message:"Author is required"
                        }
                    })} type="text" name="authorName" className="input input-bordered input-primary border-blue-600 w-full max-w-xs" />
                    {errors?.authorName && <p className="text-error font-semibold">{errors?.authorName.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-blue-600 font-semibold">Title of your review</span>
                    </label>
                    <input {...register("reviewTitle",{
                        required:{
                            value:true,
                            message:"Author is required"
                        }
                    })} type="text" name="reviewTitle" className="input input-bordered input-primary border-blue-600 w-full max-w-xs" />
                    {errors?.reviewTitle && <p className="text-error font-semibold">{errors?.reviewTitle.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-blue-600 font-semibold">Photo</span>
                    </label>
                    <input {...register("image")} type="file" name="image" className="file-input file-input-bordered file-input-primary border-blue-600 w-full max-w-xs" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-blue-600 font-semibold">Review</span>
                    </label>
                    <textarea {...register("reviewText",{
                        required:{
                            value:true,
                            message:"Review writing is required"
                        }
                    })} type="text" name="reviewText" className="textarea textarea-bordered textarea-primary border-blue-600 w-full max-w-xs"></textarea>
                    {errors?.reviewText && <p className="text-error font-semibold">{errors?.reviewText.message}</p>}
                </div>
                <div className="form-control">
                    <input type="submit" className="btn btn-primary bg-blue-600" value="Post" />
                </div>
            </form>
            :
            <Link to="/signin" className="btn btn-primary bg-blue-600">Please Sign in to write your Book review</Link>
            }
        </div>
    );
};

export default CreateBookReviews;
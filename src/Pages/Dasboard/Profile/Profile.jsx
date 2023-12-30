import { useContext } from "react";
import { AuthContext } from "../../../api/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Card from "../../../Components/Card"
import BlogCard from "../../Blog/Blog/BlogCard/BlogCard";
import Swal from "sweetalert2";
import SingleLoading from "../../../Components/SingleLoading"

const Profile = () => {
    const {user} = useContext(AuthContext)
    const {data:blogItems, isLoading:isBlogItemLoading, refetch:blogItemRefetch} = useQuery({
        queryKey: ["blog", user?.email],
        queryFn: async()=>{
            const res = await fetch(`https://peon-bookshop-server.vercel.app/v2/blog?email=${user?.email}`,{
                headers:{
                    authorization: `bearer ${localStorage.getItem("peonKey")}`
                }
            });
            const data = await res.json();
            console.log(`this blog is calling`)
            return data
        }
    })
    const {data:bookReviews, isLoading:isBookReviewLoading, refetch:bookReviewRefetch}= useQuery({
        queryKey:["bookReview", user?.email],
        queryFn: async()=>{
            const res = await fetch(`https://peon-bookshop-server.vercel.app/bookReview?email=${user?.email}`,{
                headers:{
                    authorization: `bearer ${localStorage.getItem("peonKey")}`
                }
            })
            const data = await res.json();
            return data
        }
    })
    const handleBlogItemDelete = id =>{
        fetch(`https://peon-bookshop-server.vercel.app/blog/${id}`,{
            method: 'DELETE',
            headers:{
                authorization: `bearer ${localStorage.getItem("peonKey")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount > 0){
                Swal.fire({
                    icon:"error",
                    title: "Blog Deleted Successfully"
                })
                blogItemRefetch()
            }
        })
    }
    const handleBookReviewDelete = id =>{
        fetch(`https://peon-bookshop-server.vercel.app/bookReview/${id}`,{
            method:'DELETE',
            headers:{
                authorization: `bearer ${localStorage.getItem("peonKey")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount > 0){
                Swal.fire({
                    icon: "error",
                    title:"Book Review Deleted Successfully"
                })
                bookReviewRefetch()
            }
        })
    }
    if(isBlogItemLoading || isBookReviewLoading){
        return (
            <SingleLoading/>
        )
    }
    return (
        <div>
            <h2 className="text-blue-600 font-semibold text-center text-3xl">Welcome {user?.displayName}</h2>
            <div className="mt-8 text-gray-700 font-semibold text-left">
                <p>Name: {user?.displayName}</p>
                <p>Email: {user?.email}</p>
                <p>Total Purchase:</p>
                <p>Pending Orders:</p>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl text-blue-600 text-left font-semibold">Your Blogs</h2>
                {blogItems.length === 0 && <h2 className="text-3xl text-blue-400 font-semibold mt-4 capitalize">no blog yet</h2>}
                <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4 mx-4">
                    {
                        blogItems.map((blogItem) => (
                            <BlogCard key={blogItem._id} blogItem={blogItem} action={"Delete"} actionMethod={handleBlogItemDelete}></BlogCard>
                        ))
                    }
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl text-blue-600 text-left font-semibold">Your Book Reviews</h2>
                {bookReviews.length === 0 && <h2 className="text-3xl text-blue-400 font-semibold mt-4 capitalize">no book review yet</h2>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mx-4">
                {
                    bookReviews.map((bookReview) => (
                        <Card key={bookReview._id} link={`/bookReview/${bookReview?._id}`} title={bookReview?.reviewTitle} description={bookReview?.reviewText} image_url={bookReview?.image_url} subtitle={bookReview?.userName} extras={bookReview?.bookName} object={bookReview} secondaryAction={"Delete"} secondaryActionMethod={handleBookReviewDelete}></Card>
                    ))
                }
                </div>
            </div>
        </div>
    );
};

export default Profile;
import { useQuery } from "@tanstack/react-query";
import CreateBookReviews from "../CreateBookReviews/CreateBookReviews";
import Reviews from "../Reviews/Reviews";


const BookReview = () => {
    const {data:bookReviews=[], isLoading,refetch} = useQuery({
        queryKey:["bookReveiws"],
        queryFn: async()=>{
            const res = await fetch("http://localhost:5000/bookReview",{
                headers:{
                    authorization:`bearer ${localStorage.getItem("peonKey")}`
                }
            })
            const data = await res.json();
            return data
        }
    })
    return (
        <div className="flex flex-col lg:flex-row gap-4">
           <CreateBookReviews refetch={refetch}></CreateBookReviews>
           <Reviews bookReviews={bookReviews} isLoading={isLoading}></Reviews>
        </div>
    );
};

export default BookReview;
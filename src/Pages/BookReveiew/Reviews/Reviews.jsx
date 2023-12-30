import BookReviewCard from "../BookReviewCard/BookReviewCard";
import SingleLoading from "../../../Components/SingleLoading"

const Reviews = ({isLoading, bookReviews}) => {

    if(isLoading){
        return (
            <SingleLoading/>
        )
    }
    return (
        <div className="my-4 p-4 bg-base-300 lg:w-3/4">
            {
                bookReviews.length > 0 
                ?
                <div className="mt-4">
            {
                bookReviews.map((bookReviewItem) => (
                    <BookReviewCard key={bookReviewItem._id} bookReviewItem={bookReviewItem}></BookReviewCard>
                ))
            }
            </div>
                :
                <p className="text-3xl text-center">No book reviews</p>
            }
        </div>
    );
};

export default Reviews;
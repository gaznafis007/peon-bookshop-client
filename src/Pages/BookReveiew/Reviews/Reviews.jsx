import BookReviewCard from "../BookReviewCard/BookReviewCard";

const Reviews = ({isLoading, bookReviews}) => {

    if(isLoading){
        return (
            <h2 className="text-5xl text-center text-green-600">Loading...</h2>
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
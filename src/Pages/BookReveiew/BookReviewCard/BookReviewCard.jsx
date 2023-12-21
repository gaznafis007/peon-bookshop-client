import { Link } from "react-router-dom";


const BookReviewCard = ({bookReviewItem}) => {
    return (
        <div className="card bg-base-100 shadow-xl my-4">
            <figure className="px-2 pt-8">
                <img src={bookReviewItem?.image_url} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{bookReviewItem?.reviewTitle}</h2>
                <p className="text-gray-600 font-semibold text-start">{bookReviewItem?.bookName}</p>
                <p className="text-gray-600 font-semibold text-start">{bookReviewItem?.authorName}</p>
                <p className="text-start">
                    {`${bookReviewItem?.reviewText.slice(0, 100)}...`}
                    <Link to={`/bookreview/${bookReviewItem._id}`} className="text-blue-600">Read More</Link>
                </p>
                
                <div className="card-actions">
                    <p className="font-bold text-gray-700">-{bookReviewItem?.userName}</p>
                </div>
            </div>
        </div>
    );
};

export default BookReviewCard;
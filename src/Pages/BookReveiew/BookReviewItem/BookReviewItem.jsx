
import { useLoaderData } from 'react-router-dom';
const BookReviewItem = () => {
    const bookReviewItem = useLoaderData()
    console.log(bookReviewItem)
    return (
        <div className="bg-base=300 mt-4 p-4">
        <h2 className="text-4xl text-center text-blue-600">{bookReviewItem?.reviewTitle}</h2>
        <img src={bookReviewItem?.image_url} className='mx-auto my-4 shadow-xl' />
        <p className="text-gray-500 text-lg font-semibold capitalize text-center">{bookReviewItem?.authorName}</p>
        <p className="text-sm text-gray-400 text-md text-start  mx-2 lg:mx-auto">{bookReviewItem?.userName}</p>
        <p className="mt-3 text-start mx-2 lg:mx-auto">
            {bookReviewItem?.reviewText}
        </p>
        </div>
    );
};

export default BookReviewItem;

import SectionHeader from '../../../Components/SectionHeader';
import useData from '../../../Hooks/useData/useData';

const Customerreview = () => {
    const [reviews, isLoading] = useData('http://localhost:5000/customerReview')
    if(isLoading){
        return (
            <h2 className="text-5xl text-green-600 text-center">Loading</h2>
        )
    }
    return (
        <div className='my-4'>
            <SectionHeader title={"Customer Review"} subtitle={"Here are some review of our statisfied client"}></SectionHeader>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    reviews.map((review) => (
                        <div key={review?.customer_name} className="card bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src={review?.image_url} alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{review?.customer_name}</h2>
                            <p className='text-justify'>{review?.comment}</p>
                            <p className="text-blue-600">Location: {review?.location}</p>
                        </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Customerreview;
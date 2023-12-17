import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import SectionHeader from '../../../Components/SectionHeader';
import useData from '../../../Hooks/useData/useData';


const MiniBooks = () => {
    // const [miniBooks, setMiniBooks] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    const [miniBooks, isLoading] = useData("http://localhost:5000/miniBooks")
    if(isLoading){
        return(
            <>
                <h2 className="text-5xl text-center text-green-600">Loading...</h2>
            </>
        )
    }
    return (
        <div className="my-4">
            
            <SectionHeader title={"Some of our Books"} subtitle={"All the famous books of famous writers are gathered here to purchase."}></SectionHeader>
            <Swiper
        slidesPerView={'3'}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
  {
    miniBooks.map((miniBook) => (
        <SwiperSlide key={miniBook?.book_title}>
            <div className="card shadow-xl bg-base-100">
        <figure>
          <img src={miniBook.book_image_url} alt="Book Cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{miniBook.book_title}</h2>
          <p className='text-start'>{miniBook.book_description}</p>
          <div className="card-actions justify-end mt-4">
            <div className="badge badge-outline">{miniBook.book_price} USD</div>
            <div className="btn btn-sm btn-primary btn-outline">Buy now</div>
            <div className="btn btn-sm btn-outline">Save to cart</div>
          </div>
        </div>
      </div>
        </SwiperSlide>
    ))}
      </Swiper>
      <Link to="/books" className=" mx-auto text-white w-1/3 btn btn-info bg-blue-600"> Explore all the books</Link>
        </div>
    );
};

export default MiniBooks;
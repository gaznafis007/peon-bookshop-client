import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import SectionHeader from '../../../Components/SectionHeader';
import useData from '../../../Hooks/useData/useData';
import CardLoading from "../../../Components/CardLoading"
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../../api/AuthProvider';


const MiniBooks = () => {
  const {user} = useContext(AuthContext)
    // const [miniBooks, setMiniBooks] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    const [miniBooks, isLoading] = useData("https://peon-bookshop-server.vercel.app/miniBooks")
    if(isLoading){
        return(
            <>
                <CardLoading/>
            </>
        )
    }
    const addToCart = id =>{
      if(!user){
          return Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "You need to login, first",
              footer: `<a href="/signin"> Please sign in to add this book to cart</a>`
            });
      }
      else{
          fetch(`https://peon-bookshop-server.vercel.app/wishlist?id=${id}&email=${user?.email}`,{
          method: 'POST',
          headers:{
              authorization: `bearer ${localStorage.getItem("peonKey")}`
          }
      })
      .then(res=>res.json())
      .then(data=>{
          if(data.acknowledged){
              Swal.fire({
                  icon: "success",
                  title: "Congrats",
                  text: "Book added to the cart",
                });
          }
      })
      }
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
            <Link to={`/books/${miniBook._id}`} className="btn btn-sm btn-primary btn-outline">Buy now</Link>
            <div onClick={()=>addToCart(miniBook._id)} className="btn btn-sm btn-outline">Save to cart</div>
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
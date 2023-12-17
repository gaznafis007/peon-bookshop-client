
import Lottie from 'lottie-react';
import discount from "../../../assets/discount.json"
import { Link } from 'react-router-dom';

const UpcommingEvent = () => {
    return (
        <div className="hero  bg-base-100">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <Lottie animationData={discount}></Lottie>
    <div className='text-start'>
        <h2 className="text-4xl lg:text-6xl text-blue-600 font-semibold">Biggest Fest of te year</h2>
      <p className='mt-4 text-lg lg:text-xl'>Here we are! we came up with one of the greatest event of the year. There many events are going on with book review competition, Discount sale and many more to explore</p>
      <Link to="/" className='text-xl lg:text-2xl inline-block text-blue-600 font-semibold py-2 mt-2 rounded-none hover:border-b-4 hover:border-blue-600'>Explore</Link>
    </div>
  </div>
</div>
    );
};

export default UpcommingEvent;
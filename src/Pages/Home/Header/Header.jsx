import Lottie from "lottie-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import animation1 from "../../../assets/Animation1.json"
import animation2 from "../../../assets/Animation2.json"

const Header = () => {
    return (
        <>
        <Carousel showArrows={true} infiniteLoop={true}>
        <div className="hero bg-blue-600 px-6 ">
  <div className="hero-content text-white flex-col lg:flex-row-reverse">
    <div className="lg:w-1/2">
        <Lottie animationData={animation1}></Lottie>
    </div>
    <div>
      <h1 className="text-5xl font-bold text-start">Peon, your books our responsibility</h1>
      <p className="py-6 text-start">This is a online bookshop where you can find all the books of literature science and others genre of all famous writers.</p>
    </div>
  </div>
        </div> 
        <div className="hero bg-blue-600 text-white px-6">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="lg:w-1/2">
                <Lottie animationData={animation2}></Lottie>
            </div>
            <div>
            <h1 className="text-5xl font-bold text-start">Peon, your books our responsibility</h1>
            <p className="py-6 text-start">This is a online bookshop where you can find all the books of literature science and others genre of all famous writers.</p>
            </div>
        </div>
        </div>
        </Carousel>
 

        </>
    );
};

export default Header;
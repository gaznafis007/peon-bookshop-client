import Customerreview from "../CustomerReview/CustomerReview";
import Header from "../Header/Header";
import MiniBooks from "../MiniBooks/MiniBooks";
import OurTeam from "../OurTeam/OurTeam";
import UpcommingEvent from "../UpcommingEvent/UpcommingEvent";
import Blog from "../Blog/Blog"


const Home = () => {
    return (
        <div>
           <Header/>
           <MiniBooks/>
           <Customerreview/>
           <UpcommingEvent/>
           <OurTeam/>
           <Blog/>
        </div>
    );
};

export default Home;
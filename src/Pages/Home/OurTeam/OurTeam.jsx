import { Navigation } from 'swiper/modules';
import SectionHeader from '../../../Components/SectionHeader';
import useData from '../../../Hooks/useData/useData';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Loading from "../../../Components/Loading"

const OurTeam = () => {
    const [teams, isLoading] = useData('https://peon-bookshop-server.vercel.app/ourTeam')
    if(isLoading){
        return (
            <Loading/>
        )
    }
    return (
        <div className='my-4'>
            <SectionHeader title={"Our Team"} subtitle={"Meet our core team who made this possible to reach books in every corner of the world"}></SectionHeader>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {
            teams.map((team) => (
                <SwiperSlide key={team?.name}>
                     <div className="card bg-base-100 shadow-xl">
                        <div className="px-10 pt-10 w-2/5 mx-auto rounded-full">
                            <img src={team?.image_url} alt="Shoes" className="rounded-xl" />
                        </div>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{team?.position}</h2>
                            <p className='text-justify'>{team?.name}</p>
                            {/* <p className="text-blue-600">Location: {team?.location}</p> */}
                        </div>
                        </div>
                </SwiperSlide>
            ))
        }
      </Swiper>
        </div>
    );
};

export default OurTeam;
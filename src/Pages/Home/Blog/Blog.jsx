import { Link } from "react-router-dom";
import blog from "../../../assets/blog.json";
import Lottie from "lottie-react";
const Blog = () => {
    return (
        <div className="hero bg-base-200 my-4 px-4">
        <div className="hero-content flex-col lg:flex-row">
            <Lottie animationData={blog}></Lottie>
            <div className="text-end lg:w-1/2">
            <h1 className="text-5xl font-bold text-blue-600">Express your literacy</h1>
            <p className="py-6">We also respect every aspect and thought and also believe that writting can be the beginning to sharpening the inner literacy. So, we create a platform where you can write what you want to write. And also read what other wants to say.</p>
            <Link to="/blog" className="py-2 font-semibold hover:border-b-2 text-blue-600 border-blue-600">Explore blog</Link>
            </div>
        </div>
        </div>
    );
};

export default Blog;
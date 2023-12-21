import { Link } from "react-router-dom";

const BlogCard = ({blogItem}) => {
    return (
        <div className="card bg-base-100 shadow-xl my-4">
            <div className="card-body">
                <h2 className="card-title text-blue-600">{blogItem?.title}</h2>
                <p className="text-lg text-gray-400 text-start">{blogItem?.name}</p>
                <span className="text-gray-400 text-sm text-start">{blogItem?.email}</span>
                <p className="text-start">
                    {
                        blogItem?.blog.length > 500
                        ?
                            <>
                             {blogItem?.blog.slice(0,300)}...
                            <Link className="text-blue-600" to={`/blog/${blogItem._id}`}>Read More</Link>
                            </>
                        :
                        blogItem?.blog
                        
                    }
                </p>
                <div className="card-actions justify-end">
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
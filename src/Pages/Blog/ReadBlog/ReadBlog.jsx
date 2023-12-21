import BlogCard from "../Blog/BlogCard/BlogCard";


const ReadBlog = ({isLoading, blogs}) => {
    if(isLoading){
        return (
            <h2 className="text-5xl text-green-600 text-center">Loading...</h2>
        )
    }
    return (
        <div className="bg-base-300 p-4 my-4">
            {
                blogs.length > 0 ?
                <div className="mt-4">
            {
                blogs.map((blogItem) => (
                    <BlogCard key={blogItem._id} blogItem={blogItem}></BlogCard>
                ))
            }
            </div>
            :
            <p className="text-xl">No Blog right now</p>
            }
            
        </div>
    );
};

export default ReadBlog;
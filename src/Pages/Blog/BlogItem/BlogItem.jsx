import { useLoaderData } from "react-router-dom";


const BlogItem = () => {
    const blogItem = useLoaderData();
    console.log(blogItem)
    return (
        <div>
            <h2 className="text-4xl">{`${blogItem?.name}'s blog`}</h2>
        </div>
    );
};

export default BlogItem;
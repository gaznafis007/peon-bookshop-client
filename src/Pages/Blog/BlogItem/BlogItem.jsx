import { useLoaderData } from "react-router-dom";


const BlogItem = () => {
    const blogItem = useLoaderData();
    return (
        <div className="bg-base=300 mt-4 p-4">
            <h2 className="text-4xl text-center text-blue-600">{blogItem?.title}</h2>
            <p className="text-gray-500 text-lg text-start font-semibold">{blogItem?.name}</p>
            <p className="text-sm text-gray-400 text-md text-start">{blogItem?.email}</p>
            <p className="mt-3 text-start">
                {blogItem?.blog}
            </p>
        </div>
    );
};

export default BlogItem;

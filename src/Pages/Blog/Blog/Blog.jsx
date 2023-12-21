import { useQuery } from "@tanstack/react-query";
import Header from "../Header/Header";
import ReadBlog from "../ReadBlog/ReadBlog";
import CreateBlog from "./CreateBlog/CreateBlog";


const Blog = () => {
    const {data:blogs=[], isLoading, refetch} = useQuery({
        queryKey:['blogs'],
        queryFn: async()=>{
            const res = await fetch("http://localhost:5000/blog")
            const data = res.json();
            return data;
        }
    })
    return (
        <div>
            <Header/>
            <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-1/3">
            <CreateBlog refetch={refetch}></CreateBlog>
            </div>
            <div className="lg:w-2/3">
            <ReadBlog blogs={blogs} isLoading={isLoading}></ReadBlog>
            </div>
            </div>
        </div>
    );
};

export default Blog;
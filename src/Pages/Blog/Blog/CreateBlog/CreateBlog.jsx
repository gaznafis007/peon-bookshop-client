import { useContext } from "react";
import { AuthContext } from "../../../../api/AuthProvider";
import { Link } from "react-router-dom";


const CreateBlog = ({refetch}) => {
    const {user} = useContext(AuthContext)
    const handleBlog = event =>{
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const blog = form.blog.value;
        const name = user?.displayName;
        const email = user?.email;
        const blogInfo = {
            name,
            email,
            title,
            blog
        }
        console.log(blogInfo)
            fetch("https://peon-bookshop-server.vercel.app/blog",{
                method:'POST',
                headers:{
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem("peonKey")}`
                },
                body: JSON.stringify(blogInfo)
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.acknowledged){
                    console.log(data)
                    form.reset()
                    refetch()
                }
            })
        
    }

    return (
        <div className="my-4 bg-base-300 p-4">
            {
                user?.uid ?
                <>
                    <h2 className="text-2xl my-2">Scratch your mind here</h2>
                <form onSubmit={handleBlog} className="flex flex-col align-middle gap-4 justify-center">
                <input type="text" name="title" placeholder="Your title" className="input mx-auto input-bordered w-full max-w-xs" />
                <textarea name="blog" placeholder="Write what you want to..." className="textarea mx-auto textarea-bordered textarea-md w-full max-w-xs" ></textarea>
                <input type={"submit"} value={"post"} className="btn btn-primary text-white mt-3 bg-blue-600"/>
                </form>
                </>
                :
                <Link to="/signin" className="btn btn-primary bg-blue-600 text-white">Please Login to write your story</Link>
            }
        </div>
    );
};

export default CreateBlog;
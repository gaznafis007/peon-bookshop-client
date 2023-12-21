import { useContext } from "react";
import { AuthContext } from "../../../../api/AuthProvider";


const CreateBlog = ({refetch}) => {
    const {user} = useContext(AuthContext)
    const handleBlog = event =>{
        event.preventDefault();
        const form = event.target;
        const blog = form.blog.value;
        const name = user?.displayName;
        const email = user?.email;
        const blogInfo = {
            name,
            email,
            blog
        }
            fetch("http://localhost:5000/blog",{
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
                <form onSubmit={handleBlog} className="flex flex-row align-middle gap-4 justify-center">
                <textarea name="blog" placeholder="Write what you want to..." className="textarea textarea-bordered textarea-md w-full max-w-xs" ></textarea>
                <input type={"submit"} value={"post"} className="btn btn-primary text-white mt-3 bg-blue-600"/>
                </form>
                </>
                :
                <button className="btn btn-primary bg-blue-600 text-white">Please Login to write your story</button>
            }
        </div>
    );
};

export default CreateBlog;
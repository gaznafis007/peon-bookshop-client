import SectionHeader from "../../../Components/SectionHeader";
import Card from "../../../Components/Card"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../api/AuthProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";


const Books = () => {
    const {user} = useContext(AuthContext)
    const [data, setData] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [author,setAuthor] = useState("");
    const {data:authors=[]} = useQuery({
        queryKey:["authors"],
        queryFn: async()=>{
            const res = await fetch("http://localhost:5000/authors");
            const data = res.json();
            return data
        }
    })
    useEffect(()=>{
        fetch(`http://localhost:5000/allBooks?page=${page}`)
        .then(res=>res.json())
        .then(result=>{
            setData(result);
            setIsLoading(false)
        })
    },[page])
    const previousAction = ()=>{
        if(page>0){
            let currentPage = page - 1;
            setPage(currentPage)
        }
        console.log(page)
    }
    const nextAction = ()=>{
        let currentPage = page + 1;
        setPage(currentPage)
        console.log(page)
    }
    const searchByQueryOrValue = async (query,value) =>{
        console.log(query,value)
        const res = await fetch(`http://localhost:5000/allBooks?${query}=${value}`);
        const result = await res.json();
        setData(result)
    }
    const handleAuthor = event =>{
        event.preventDefault();
        const authorChange = event.target.value;
        setAuthor(authorChange)
        if(authorChange !== 'none'){
            searchByQueryOrValue('author', authorChange)
        }

    }
    const handleTitle = event =>{
        event.preventDefault();
        const title = event.target.title.value;
        searchByQueryOrValue("title", title)
    }
    const addToCart = id =>{
        if(!user){
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to login, first",
                footer: `<a href="/signin"> Please sign in to add this book to cart</a>`
              });
        }
        else{
            fetch(`http://localhost:5000/wishlist?id=${id}&email=${user?.email}`,{
            method: 'POST',
            headers:{
                authorization: `bearer ${localStorage.getItem("peonKey")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                Swal.fire({
                    icon: "success",
                    title: "Congrats",
                    text: "Book added to the cart",
                  });
            }
        })
        }
    }
    if(isLoading){
        return(
            <>
                <h2 className="text-green-600 text-center text-5xl">Loading...</h2>
            </>
        )
    }
    return (
        <section className="my-4">
            <SectionHeader title={"Our Books"} subtitle={"You can find what satisfy your desire of reading and learning"}></SectionHeader>
            <div className="mt-4">
                <div className="flex flex-col lg:flex-row gap-4">
                <p className="my-2 text-start">Search Book by author</p>
                <select onChange={handleAuthor} value={author}  className="select select-bordered w-full max-w-xs">
                    <option defaultValue="none">Search By your favourite author</option>
                    {
                        authors.map((author) => (
                            <option value={author} key={author}>{author}</option>
                        ))
                    }    
                </select>
                <form onSubmit={handleTitle}>
                    <input type="text" name="title" className="input input-bordered mr-4 max-w-xs" placeholder="Search Book name" />
                    <input type="submit" value="search" className="btn btn-sm btn-primary text-white bg-blue-600" />
                </form>
                </div>
            </div>
            {
                data.message ? <h2 className="text-4xl text-center">{data?.message}</h2>:(
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-6">
                        {
                            data?.books.map((book) => (
                                <Card key={book?._id} object={book} title={book?.book_title} image_url={book?.book_image_url} description={book?.book_description} subtitle={book?.book_genre} primaryAction={"Buy now"} secondaryAction={"Add to Cart"} extras={book?.book_author} secondaryActionMethod={addToCart}
                                link={`/books/${book._id}`}></Card>
                            ))
                        }
                    </div>
                )
            }
            <div className="my-4 flex flex-row justify-between">
                    <div>
                        <button onClick={previousAction} className="btn">Prev</button>
                    </div>
                    <div>
                        <button onClick={nextAction} className="btn">Next</button>
                    </div>
            </div>
        </section>
    );
};

export default Books;
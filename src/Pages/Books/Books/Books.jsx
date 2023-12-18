import SectionHeader from "../../../Components/SectionHeader";
import useData from "../../../Hooks/useData/useData";
import Card from "../../../Components/Card"
import { useEffect, useState } from "react";


const Books = () => {
    const [data, setData] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    useEffect(()=>{
        fetch(`http://localhost:5000/books?page=${page}`)
        .then(res=>res.json())
        .then(result=>{
            setData(result);
            setIsLoading(false)
        })
    },[page])
    console.log(page)
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
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-6">
                    {
                        data?.books.map((book) => (
                            <Card key={book?._id} title={book?.book_title} image_url={book?.book_image_url} description={book?.book_description} subtitle={book?.book_genre} primaryAction={"Buy now"} secondaryAction={"Add to cart"} extras={book?.book_author}></Card>
                        ))
                    }
            </div>
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
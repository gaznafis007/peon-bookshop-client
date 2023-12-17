import SectionHeader from "../../../Components/SectionHeader";
import useData from "../../../Hooks/useData/useData";
import Card from "../../../Components/Card"


const Books = () => {
    const [books, isLoading] = useData("http://localhost:5000/books")
    if(isLoading){
        return(
            <>
                <h2 className="text-green-600 text-center text-5xl">Loading...</h2>
            </>
        )
    }
    return (
        <div className="my-4">
            <SectionHeader title={"Our Books"} subtitle={"You can find what satisfy your desire of reading and learning"}></SectionHeader>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-6">
                    {
                        books.map((book) => (
                            <Card key={book?._id} title={book?.book_title} image_url={book?.book_image_url} description={book?.book_description} subtitle={book?.book_genre} primaryAction={"Buy now"} secondaryAction={"Add to cart"} extras={book?.book_author}></Card>
                        ))
                    }
            </div>
        </div>
    );
};

export default Books;
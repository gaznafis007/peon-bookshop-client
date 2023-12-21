import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Books from "../Pages/Books/Books/Books";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import Blog from "../Pages/Blog/Blog/Blog";
import BookReview from "../Pages/BookReveiew/BookReview/BookReview";
import PrivateRoute from "../Private/PrivateRoute/PrivateRoute";
import BlogItem from "../Pages/Blog/BlogItem/BlogItem";
import BookReviewItem from "../Pages/BookReveiew/BookReviewItem/BookReviewItem";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children:[
            {
                path:"/",
                element: <Home/>
            },
            {
                path: "/books",
                element: <Books/>
            },
            {
                path: "/blog",
                element: <Blog/>
            },
            {
                path: "/blog/:id",
                loader: ({params})=> fetch(`http://localhost:5000/blog/${params.id}`),
                element: <BlogItem></BlogItem>
            },
            {
                path: "/bookreview",
                element: <PrivateRoute><BookReview/></PrivateRoute>
            },
            {
                path: "/bookreview/:id",
                loader: ({params})=> fetch(`http://localhost:5000/bookReview/${params.id}`),
                element: <PrivateRoute><BookReviewItem></BookReviewItem></PrivateRoute>
            },
            {
                path: "/signup",
                element: <SignUp/>
            },
            {
                path: "/signin",
                element: <SignIn/>
            }
        ]
    }
])
export default router
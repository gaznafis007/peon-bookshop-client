import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Books from "../Pages/Books/Books/Books";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import Blog from "../Pages/Blog/Blog/Blog";
import BookReview from "../Pages/BookReveiew/BookReview/BookReview";
import PrivateRoute from "../Private/PrivateRoute/PrivateRoute";

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
                path: "/bookreview",
                element: <PrivateRoute><BookReview/></PrivateRoute>
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
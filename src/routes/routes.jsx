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
import ViewCart from "../Pages/ViewCart/ViewCart";
import BookDetails from "../Pages/Books/BookDetails/BookDetails";
import Dashboard from "../Pages/Dasboard/Dashboard/Dashboard";
import MyOrders from "../Pages/Dasboard/MyOrders/MyOrders";
import AllUsers from "../Pages/Dasboard/AllUsers/AllUsers";
import AdminRoute from "../Private/AdminRoute/AdminRoute";
import Profile from "../Pages/Dasboard/Profile/Profile";
import ManageBooks from "../Pages/Admin/ManageBooks/ManageBooks";
import AddNewBooks from "../Pages/Admin/AddNewBooks/AddNewBooks";
import AllOrders from "../Pages/Admin/AllOrders/AllOrders";



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
                path: "/books/:id",
                loader: ({params})=> fetch(`https://peon-bookshop-server.vercel.app/books/${params.id}`),
                element: <BookDetails></BookDetails>
            },
            {
                path: "/blog",
                element: <Blog/>
            },
            {
                path: "/blog/:id",
                loader: ({params})=> fetch(`https://peon-bookshop-server.vercel.app/blog/${params.id}`),
                element: <BlogItem></BlogItem>
            },
            {
                path: "/bookreview",
                element: <PrivateRoute><BookReview/></PrivateRoute>
            },
            {
                path: "/bookreview/:id",
                loader: ({params})=> fetch(`https://peon-bookshop-server.vercel.app/bookReview/${params.id}`),
                element: <PrivateRoute><BookReviewItem></BookReviewItem></PrivateRoute>
            },
            {
                path:"/wishlist",
                element:<PrivateRoute><ViewCart/></PrivateRoute>
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
    },
    {
            path: "/dashboard",
            element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
            children:[
                {
                    path:"/dashboard",
                    element:<Profile></Profile>
                },
                {
                    path:"/dashboard/myOrders",
                    element:<MyOrders/>
                },
                {
                    path:"/dashboard/allUsers",
                    element:<AdminRoute><AllUsers/></AdminRoute>
                },
                {
                    path:"/dashboard/manageBooks",
                    element:<ManageBooks/>
                },
                {
                    path:"/dashboard/addNewBook",
                    element:<AdminRoute><AddNewBooks></AddNewBooks></AdminRoute>
                },
                {
                    path:"/dashboard/allOrders",
                    element:<AdminRoute><AllOrders></AllOrders></AdminRoute>
                }
            ]
        
    }
])
export default router
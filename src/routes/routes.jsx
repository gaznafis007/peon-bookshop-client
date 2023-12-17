import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Books from "../Pages/Books/Books/Books";

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
                path: "/blog"
            },
            {
                path: "/bookreview"
            }
        ]
    }
])
export default router
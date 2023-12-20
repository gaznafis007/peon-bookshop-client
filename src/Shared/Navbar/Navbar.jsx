import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../api/AuthProvider";


const Navbar = () => {
  const {user,logOut} = useContext(AuthContext)

    const navItems = 
    <>
    <li>
        <NavLink to="/" className={({isActive})=>
            isActive ? "border-b-2 border-blue-500 text-blue-800 p-2 capitalize text-xl inline-block rounded-none": "text-blue-600 capitalize"
        
    
    }>home</NavLink>
    </li>
    <li>
        <NavLink to="/books" className={
            ({isActive})=>
            isActive ? "border-b-2 border-blue-500 text-blue-800 p-2 capitalize text-xl inline-block rounded-none": "text-blue-600 capitalize"
        
        }>books</NavLink>
    </li>
    <li>
        <NavLink to="/bookreview" className={
            ({isActive})=>
            isActive ? "border-b-2 border-blue-500 text-blue-800 p-2 capitalize text-xl inline-block rounded-none": "text-blue-600 capitalize"
        
        }>book review</NavLink>
    </li>
    <li>
        <NavLink to="/blog" className={
            ({isActive})=>
            isActive ? "border-b-2 border-blue-500 text-blue-800 p-2 capitalize text-xl inline-block rounded-none": "text-blue-600 capitalize"
        
        }>blog</NavLink>
    </li>
    </>

    return (
        <>
            <nav className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                      </div>
                      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                      </ul>
                    </div>
                  <Link to="/" className="btn btn-ghost text-2xl text-blue-600">Peon</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                  <ul className="menu menu-horizontal px-1">
                    {navItems}
                  </ul>
                </div>
                <div className="navbar-end">
                  {
                  user?.uid ?
                  <>
                    <span className="text-blue-600">{user?.displayName}</span>
                  <button onClick={logOut} className="btn btn-sm btn-outline ml-2">Sign out</button>
                  </>
                  :
                  <Link to="/signin" className="text-blue-600 capitalize">Sing in</Link>
                  }
                </div>
          </nav>
        </>
    );
};

export default Navbar;
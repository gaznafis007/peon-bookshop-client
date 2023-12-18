import { Link } from "react-router-dom";
import signInAnimation from "../../assets/login.json"
import Lottie from "lottie-react";


const SignIn = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            
            <Lottie animationData={signInAnimation}></Lottie>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
            <h1 className="text-5xl font-bold pl-4">Sign Up!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <Link to="/signup" className="label-text-alt link link-hover">New to our site? please sign up</Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <div className="divider">OR</div>
            <button className="btn btn-outline">Sign in with google</button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default SignIn;
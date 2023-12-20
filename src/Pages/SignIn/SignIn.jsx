import { Link, useLocation, useNavigate } from "react-router-dom";
import signInAnimation from "../../assets/login.json"
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../api/AuthProvider";


const SignIn = () => {
  const {register, handleSubmit, formState:{errors}} = useForm()
  const {signIn} = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/"
  const handleSignIn = data =>{
    console.log(data)
    signIn(data.email,data.password)
    .then(res=>{
      console.log(res.user)
      navigate(from, {replace:true})
    })
    .catch(error=>{
      console.log(error)
    })
  }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            
            <Lottie animationData={signInAnimation}></Lottie>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(handleSignIn)}>
            <h1 className="text-5xl font-bold pl-4">Sign In!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" {...register("email",{
                  required:{
                    value:true,
                    message:"Email is required"
                  }
                })} />
                {
                  errors.email && (
                    <p className="text-error mt-2 text-start">{errors?.email.message}</p>
                  )
                }
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" {...register("password",{
                  required:{
                    value:true,
                    message:"Password is required"
                  }
                })} />
                {
                  errors.password && (
                    <p className="text-error mt-2 text-start">{errors?.password.message}</p>
                  )
                }
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
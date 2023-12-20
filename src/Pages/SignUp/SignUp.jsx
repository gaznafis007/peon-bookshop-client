import { Link, useNavigate } from "react-router-dom";
import signUpAnimation from "../../assets/signup.json"
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../api/AuthProvider";

const SignUp = () => {
  const {register, handleSubmit, formState:{errors}}= useForm()
  const {signUp, getProfile} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleSignUp = (data) =>{
    console.log(data)
    const name = data.name;
    const email = data.email;
    const password = data.password;
    // const profile = {
    //   name,
    //   email,
    //   password
    // }
    signUp(email,password)
    .then(res=>{
      console.log(res.user)
      getProfile(name)
      navigate("/")
      // .then(res=>{
      //   console.log(res)
      // })
    })
    .catch(error=>{
      console.log(error)
    })
  }
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      
      <Lottie animationData={signUpAnimation}></Lottie>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
      <h1 className="text-5xl font-bold pl-4">Sign Up!</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="name" placeholder="name" className="input input-bordered" {...register("name",{
            required:{
              value:true,
              message: "You should provide your name"
            }
          })} />
          {
            errors.name && (
              <p className="text-error mt-2 text-start"> {errors?.name.message}</p>
            )
          }
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" {...register("email",{
            required:{
              value: true,
              message: "You must provide email address"
            }
          })} />
          {
            errors.email && (
              <p className="text-error mt-2 text-start"> {errors?.email.message}</p>
            )
          }
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" {...register("password",{
            required:{
              value: true,
              message: "You must provide password"
            },
            minLength:{
              value: 8,
              message: "Password must be 8 character long"
            },
            pattern:{
              value: /(?=[A-Z])/,
              message: "Password must have uppercase character"
            }
          })} />
          {
            errors.password && (
              <p className="text-error mt-2 text-start"> {errors?.password.message}</p>
            )
          }
          <label className="label">
            <Link to="/signin" className="label-text-alt link link-hover">Already have an account? Please Login</Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <input type="submit" className="btn btn-primary"  value={"sign up"} />
        </div>
        <div className="divider">OR</div>
      <button className="btn btn-outline">Sign in with google</button>
      </form>
      
    </div>
  </div>
</div>
    );
};

export default SignUp;
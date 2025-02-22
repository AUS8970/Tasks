import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SocialLogin from "../shared/SocialLogin";
import useTheme from "../../theme/hook/useTheme";
import useAuth from "../hook/useAuth";
 
export function SimpleLoginForm() {

  const { logIn } = useAuth();

  const { register, reset, formState: { errors } } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogIn = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    logIn(email, password)
    .then((result) => {
      const user = result.user;
      console.log(user)
      reset();
      toast.success("Login Seccessfull!")
      navigate(from, {replace: true})
    })
    .catch(error => {
      toast.error(error.message || 'Login failed');
    });
  }

  const { theme } = useTheme();

  return (
     <card className={`${theme === "black" ? "bg-transparent":""} font-montserrat pt-24 pb-16 flex flex-col mx-auto items-center`} shadow={false}>
      <h1 className={`${theme === "black" ? "text-white":"text-black"} text-4xl`}> Log In </h1>
      <p className={`${theme === "black" ? "text-white":"text-black"} mt-4 text-sm font-normal`}> Welcome Back! Enter your email and password. </p>
      <SocialLogin />
      <form onSubmit={handleLogIn} className="mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <h3 className={`${theme === "black" ? "text-white":"text-black"} -mb-3`}> Your Email </h3>
          <input type="text" {...register("email", { required: true })} placeholder="name@mail.com" className="input input-bordered rounded-lg w-full" />
          {errors.email && <span className="text-red-500 font-medium"> Please enter your email! </span>}
          <h3 className={`${theme === "black" ? "text-white":"text-black"} -mb-3`}> Password </h3>
          <input type="password" {...register("password", { required: true })} placeholder="********" className="input input-bordered rounded-lg w-full" />
          {errors.password && <span className="text-red-500 font-medium"> Please enter your password! </span>}
        </div>
        <button type="submit" className={`w-full py-2 rounded-lg ${theme === "black" ? "bg-white text-black border border-white": "bg-black text-white"} font-montserrat mt-6`} fullWidth>
          Login
        </button>
        <p className={`${theme === "black" ? "text-white":"text-black"} font-montserrat mt-4 text-sm text-center font-normal`}>
          Don't have an account?
          <Link to={"/register"} className={`${theme === "black" ? "text-white":""} ml-1`}>
          Register
          </Link>
        </p>
      </form>
    </card>
  );
}
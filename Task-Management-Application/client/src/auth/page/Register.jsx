import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hook/useAxiosPublic";
import { toast } from 'react-hot-toast';
import SocialLogin from "../shared/SocialLogin";
import useTheme from "../../theme/hook/useTheme";
import useAuth from "../hook/useAuth";

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

export function SimpleRegisterForm() {
  const axiosPublic = useAxiosPublic();
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    try {
      // Upload Image to Hosting API
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { 'content-type': 'multipart/form-data' }
      });

      if (res.data && res.data.success) {
        // Create User in Firebase
        const result = await createUser(data.email, data.password);

        // Update User Profile in Firebase
        await updateUserProfile(data.name, res.data.data.display_url);

        // Prepare User Data for Database
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          uid: result.user?.uid,
          role: 'User',
          image: result.user?.photoURL,
        };

        // Save User Data in Database
        const response = await axiosPublic.post("/users", userInfo);

        console.log(response)

        if (response.data.insertedId) {
          toast.success("Registration Successful!");
          reset();
          navigate("/");
        };
      };
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration.");
    }
  };

  const { theme } = useTheme();

  return (
    <div className={`${theme === "black" ? "bg-transparent":""} font-montserrat p-16 flex flex-col mx-auto items-center`} shadow={false}>
      <h1 className={`${theme === "black" ? "text-white":"text-black"} text-4xl`} variant="h4"> Register </h1>
      <p className={`${theme === "black" ? "text-white":"text-black"} mt-4 text-sm font-normal`}>
        Nice to meet you! Enter your details to register.
      </p>
      <SocialLogin />
      <form onSubmit={handleSubmit(handleSignup)} className="mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          {/* Name */}
          <h3 className={`${theme === "black" ? "text-white":"text-black"} -mb-3`}> Your Name </h3>
          <input type="text" {...register("name", { required: "Please enter your Name!" })} placeholder="Abdullah" className="input input-bordered rounded-lg w-full" />

          {/* Email */}
          <h3 className={`${theme === "black" ? "text-white":"text-black"} -mb-3`}> Your Email </h3>
          <input type="email" {...register("email", { required: "Please enter your Email!" })} placeholder="abdullah@mail.com" className="input input-bordered rounded-lg w-full" />

          {/* Image */}
          <h3 className={`${theme === "black" ? "text-white":"text-black"} -mb-3`}> Your Profile Image </h3>
          <input type="file" accept="image/*" {...register("image", { required: "Please upload your Profile Image!" })} className="input input-bordered rounded-lg w-full" />

          {/* Password */}
          <h3 className={`${theme === "black" ? "text-white":"text-black"} -mb-3`}> Password </h3>
          <input type="password" {...register("password", {  required: "Password is required.", minLength: { value: 6, message: "Password must be at least 6 characters long." }, maxLength: { value: 15, message: "Password must not exceed 15 characters." }, pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: "Password must contain uppercase, lowercase, number, and special character." }})} placeholder="******" className="input input-bordered rounded-lg w-full" />
        </div>

        {/* Error Messages */}
        <div className="max-w-sm text-center mx-auto">
          {Object.keys(errors).map((key) => (
            <span key={key} className="text-red-500 text-sm block">
              {errors[key]?.message}
            </span>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" className={`w-full py-2 rounded-lg ${theme === "black" ? "bg-white text-black border border-white": "bg-black text-white"} font-montserrat mt-6`}>
          Register
        </button>

        {/* Login Page Link */}
        <p className={`${theme === "black" ? "text-white":"text-black"} font-montserrat mt-4 text-sm text-center font-normal`}>
          Already have an account?
          <Link to={"/login"} className={`${theme === "black" ? "text-white":""} ml-1`}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

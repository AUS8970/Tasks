import { Card, Input, Button, Typography, Select, Option } from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useAxiosPublic from "../hook/useAxiosPublic";
import { AiOutlineMail } from "react-icons/ai";
import { CiImageOn, CiUser } from "react-icons/ci";
import { MdAccountBalance, MdAttachMoney } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { toast } from 'react-hot-toast';
import SocialLogin from "../shared/SocialLogin";
import useTheme from "../../theme/hook/useTheme";

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

export function SimpleRegisterForm() {
  const axiosPublic = useAxiosPublic();
  const { handleSubmit, register, reset, control, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { 'content-type': 'multipart/form-data' }
      });

      if (res.data.success) {
        await createUser(data.email, data.password);
        await updateUserProfile(data.name, res.data.data.display_url);

        const userInfo = {
          name: data.name,
          email: data.email,
          designation: data.designation,
          salary: parseFloat(data.salary),
          bank_account_no: parseFloat(data.bank_account_no),
          role: data.role,
          image: res.data.data.display_url,
          isVerified: false,
        };

        console.log(userInfo)

        const response = await axiosPublic.post("/users", userInfo);

        console.log(response)

        if (response.data.insertedId) {
          toast.success("Data Save Successful!");
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
    <Card className={`${theme === "dark" ? "bg-transparent":""} font-montserrat pt-24 pb-16 flex mx-auto items-center`} shadow={false}>
      <Typography className={`${theme === "dark" ? "text-gray-400":"text-black"} text-4xl`} variant="h4"> Register </Typography>
      <Typography className={`${theme === "dark" ? "text-gray-500":"text-black"} mt-4 text-sm font-normal`}>
        Nice to meet you! Enter your details to register.
      </Typography>
      <SocialLogin />
      <form onSubmit={handleSubmit(handleSignup)} className="mb-2">
        <div className="mb-1 grid md:grid-cols-2 sm:grid-cols-1 gap-5 max-w-lg">
          {/* Name */}
          <div className="">
            <Input label="Name" className="focus:outline focus:outline-1 focus:outline-white" placeholder="abdullah" {...register("name", { required: "Please enter your Name!" })} icon={<CiUser />} />
          </div>

          {/* Email */}
          <div className="">
            <Input label="Email" className="focus:outline focus:outline-1 focus:outline-white" placeholder="name@mail.com" {...register("email", { required: "Please enter your Email!" })} icon={<AiOutlineMail />} />
          </div>

          {/* Role */}
          <div className="">
            <Controller name="role" className="focus:outline focus:outline-1 focus:outline-white" control={control} rules={{ required: "Please select your Role!" }} render={({ field }) => (
              <Select {...field} label="Your Role" className="">
                <Option value="HR" className="">HR</Option>
                <Option value="Employee">Employee</Option>
              </Select>
              )}/>
          </div>

          {/* Designation */}
          <div className="">
            <Controller name="designation" control={control} defaultValue="" rules={{ required: "Please select your Designation!" }} render={({ field }) => (
              <Select {...field} label="Your Designation">
                <Option value="Web Developer">Web Developer</Option>
                <Option value="Graphics Designer">Graphics Designer</Option>
                <Option value="Digital Marketer">Digital Marketer</Option>
                <Option value="Sales Assistant">Sales Assistant</Option>
                <Option value="Social Media Executive">Social Media Executive</Option>
              </Select>
            )} />
          </div>

          {/* Bank Account Number */}
          <div className="">
            <Input className="focus:outline focus:outline-1 focus:outline-white" label="Bank Account Number" placeholder="1234567890" {...register("bank_account_no", { required: "Please enter your Bank Account Number!" })} icon={<MdAccountBalance />}
            />
          </div>

          {/* Salary */}
          <div className="">
            <Input className="focus:outline focus:outline-1 focus:outline-white" label="Salary" placeholder="123456" {...register("salary", { required: "Please enter your Salary!" })} icon={<MdAttachMoney />} />
          </div>

          {/* Image */}
         <div className="">
          <Input className="focus:outline focus:outline-1 focus:outline-white" label="Image" type="file" accept="image/*" {...register("image", { required: "Please upload your Profile Image!" })} icon={<CiImageOn />} />
         </div>

          {/* Password */}
          <div className="">
            <Input className="focus:outline focus:outline-1 focus:outline-white" label="Password" placeholder="******" type="password" {...register("password", { required: true, minLength: 6, maxLength: 15, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} icon={<TbLockPassword />} />
          </div>
        </div>

        <div className="max-w-sm text-center mx-auto">
          {Object.keys(errors).map((key) => (
            <span key={key} className="text-red-500 text-sm block">
              {errors[key]?.message ||
                (key === "password" && errors[key]?.type === "required" && "Password is required.") ||
                (key === "password" && errors[key]?.type === "minLength" && "The password must be at least 6 characters long.") ||
                (key === "password" && errors[key]?.type === "maxLength" && "The password should not exceed 15 characters.") ||
                (key === "password" && errors[key]?.type === "pattern" && "Password must have one uppercase, one lowercase, one number, and one special character.")}
            </span>
          ))}
        </div>

        <Button type="submit" className={`${theme === "dark" ? "bg-white text-black border border-white":""} font-montserrat mt-6`} fullWidth>
          Register
        </Button>
        <Typography className={`${theme === "dark" ? "text-gray-500":"text-black"} font-montserrat mt-4 text-sm text-center font-normal`}>
          Already have an account?
          <Link to={"/login"} className={`${theme === "dark" ? "text-white":""} ml-1`}>
            Login
          </Link>
        </Typography>
      </form>
    </Card>
  );
}

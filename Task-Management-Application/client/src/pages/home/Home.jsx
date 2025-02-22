// import React, { useState } from 'react';
// import useTheme from '../../theme/hook/useTheme';
// import { IoIosMore } from "react-icons/io";
// import { DatePicker } from 'antd';
// import '../../index.css';
// import { Controller, useForm } from "react-hook-form";
// import toast from 'react-hot-toast';
// import useAuth from '../../auth/hook/useAuth';
// import useAxiosPublic from '../../auth/hook/useAxiosPublic';

// const Home = () => {
//   const { theme } = useTheme();
//   const { user } = useAuth();
//   const axiosPublic = useAxiosPublic();
//   const { register, reset, handleSubmit, control, formState: { errors }, } = useForm();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleTaskSubmit = async (data) => {
//     setIsSubmitting(true);

//     const taskInfo = {
//       uid: user.uid,
//       category: data.category,
//       date: data.date.toISOString(),
//       title: data.title,
//       desc: data.desc,
//     };
//     console.log(taskInfo)

//     try {
//       const response = await axiosPublic.post("/tasks", taskInfo);
//       toast.success("Task Added Successfully!");
//       if (response.data.insertedId) {
//         reset();
//       }
//     } catch {
//       setIsSubmitting(false)
//     }

//   }

//   return (
//     <div className='items-center justify-center text-center max-w-5xl mx-auto p-5'>
//       <div className={`${theme === "black" ? "" : ""}`}>

//         <form onSubmit={handleSubmit(handleTaskSubmit)} className='flex flex-col border rounded-lg p-5 max-w-lg'>
//           {/* Title */}
//           <input {...register("title", { required: true, maxLength: 50 })} type="text" placeholder="Title" className="input text-lg font-semibold rounded-none focus:outline-none p-0 border-none focus:border-none input-sm w-full" />
//           {errors.title?.type === 'required' && <span className="text-red-500 font-medium"> Title is required. </span>}
//           {errors.title?.type === 'maxLength' && <span className="text-red-500 font-medium"> The title should not exceed 50 characters. </span>}

//           {/* Description */}
//           <input {...register("desc", { maxLength: 200 })} type="text" placeholder="Description" className="textarea text-sm rounded-none focus:outline-none p-0 border-none focus:border-none textarea-sm w-full" />
//           {errors.desc?.type === 'maxLength' && <span className="text-red-500 font-medium"> The title should not exceed 200 characters. </span>}

//           {/* Date & Category */}
//           <div className="flex gap-3 mt-3">
//             {/* <div className="">
//               <div {...register("date", { required: true })} className={`border rounded-lg flex items-center justify-center ${theme === "black" ? "rounded-lg bg-black text-white" : "bg-white text-black"}`}> <DatePicker /> </div>
//             </div> */}
//             {/* Date Picker */}
//             <Controller
//               name="date"
//               control={control}
//               rules={{ required: "Date is required." }}
//               render={({ field }) => (
//                 <DatePicker
//                   {...field}
//                   className={`border rounded-lg p-2 ${theme === "black" ? "bg-black text-white" : "bg-white text-black"}`}
//                   onChange={(date) => field.onChange(date)}
//                 />
//               )}
//             />
//             {/* Category */}
//             <select
//               {...register("category", { required: "Category is required." })}
//               className={`select border-gray-200 font-normal p-2 rounded-lg ${theme === "black" ? "bg-black text-white" : "bg-white text-black"}`}
//             >
//               <option value="" disabled>Select Category</option>
//               <option value="To Do">To Do</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Done">Done</option>
//             </select>

//             {/* <div className="">
//               <select {...register("category", { required: true })} className={`select border-gray-200 font-normal select-sm focus:outline-none w-fit ${theme === "black" ? "rounded-lg bg-white text-black" : "text-black"}`}>
//                 <option disabled> Select Category </option>
//                 <option value="To Do" selected className={`${theme === "black" ? "rounded-lg bg-black text-white" : "bg-white text-black"}`}> To Do </option>
//                 <option value="In Progress" className={`${theme === "black" ? "rounded-lg bg-black text-white" : "bg-white text-black"}`}> In Progress </option>
//                 <option value="Done" className={`${theme === "black" ? "rounded-lg bg-black text-white" : "bg-white text-black"}`}> Done </option>
//               </select>
//             </div> */}
//             {/* <button type="submit" className={`w-36 rounded-lg ${theme === "black" ? "rounded-lg bg-white text-black" : "bg-black text-white"}`}> + Add Task </button> */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`mt-3 w-full p-2 rounded-lg text-lg ${theme === "black" ? "bg-white text-black border border-white" : "bg-black text-white"}`}
//             >
//               {isSubmitting ? "Adding Task..." : "+ Add Task"}
//             </button>
//           </div>
//           {errors.date?.type === 'required' && <span className="text-red-500 font-medium"> Date is required. </span>}
//           {errors.category?.type === 'required' && <span className="text-red-500 font-medium"> Category is required. </span>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from "react";
import useAuth from "../../auth/hook/useAuth";
import useAxiosSecure from "../../auth/hook/useAxiosSecure";
import useTheme from "../../theme/hook/useTheme";
import TaskAddForm from "../../components/TaskAddForm";
import Tasks from "../../components/Tasks";

const Home = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  return (
    <div className="items-center justify-center text-center max-w-5xl mx-auto p-5">
      <TaskAddForm />
      <Tasks />
    </div>
  );
};

export default Home;

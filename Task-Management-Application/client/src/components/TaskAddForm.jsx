import React, { useState } from "react";
import { DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import useTheme from "../theme/hook/useTheme";
import useAuth from "../auth/hook/useAuth";
import useAxiosSecure from "../auth/hook/useAxiosSecure";

const TaskAddForm = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, reset, control, handleSubmit, formState: { errors }, } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTaskSubmit = async (data) => {
    setIsSubmitting(true);

    const taskInfo = {
      uid: user.uid,
      category: data.category,
      date: data.date.toISOString(),
      title: data.title,
      desc: data.desc,
    };

    console.log("Task Data:", taskInfo);

    try {
      const response = await axiosSecure.post("/tasks", taskInfo);
      if (response.data.insertedId) {
        toast.success("Task Added Successfully!");
        reset();
      } else {
        toast.error("Failed to save task. Try again.");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${theme === "black" ? "bg-black text-white" : "bg-white text-black"}`}>
      <form onSubmit={handleSubmit(handleTaskSubmit)} className="flex flex-col border rounded-lg p-5 max-w-lg">
        {/* Title */}
        <input
          {...register("title", { required: "Title is required.", maxLength: 50 })}
          type="text"
          placeholder="Task Title"
          className="input text-lg font-semibold rounded-lg p-2 border border-gray-300 w-full"
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}

        {/* Description */}
        <input
          {...register("desc", { maxLength: 200 })}
          type="text"
          placeholder="Task Description (Optional)"
          className="textarea text-sm rounded-lg p-2 border border-gray-300 w-full mt-2"
        />
        {errors.desc && <span className="text-red-500">{errors.desc.message}</span>}

        {/* Date & Category */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          {/* Date Picker */}
          <div className="border text-start rounded-lg">
            <Controller name="date" control={control} rules={{ required: "Date is required."}} render={({ field }) => (
              <DatePicker {...field} className={`w-full h-full ${theme === "black" ? "text-white" : "bg-white text-black"}`} onChange={(date) => field.onChange(date)} />
            )}/>
          </div>
          {errors.date && <span className="text-red-500">{errors.date.message}</span>}

          {/* Category */}
          <select {...register("category", { required: "Category is required." })} className={`select border-gray-200 font-normal p-2 rounded-lg ${theme === "black" ? "bg-black text-white" : "bg-white text-black"}`}>
            <option value="" disabled>Select Category</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        {errors.category && <span className="text-red-500">{errors.category.message}</span>}

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting} className={`mt-3 w-full p-2 rounded-lg text-lg ${theme === "black" ? "bg-white text-black border border-white" : "bg-black text-white"}`}>
          {isSubmitting ? "Adding Task..." : "+ Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskAddForm;
import React from 'react';
import useTheme from '../../theme/hook/useTheme';
import { IoIosMore } from "react-icons/io";
import { DatePicker } from 'antd';
import '../../index.css';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import useAuth from '../../auth/hook/useAuth';
import useAxiosPublic from '../../auth/hook/useAxiosPublic';

const Home = () => {

  const { theme } = useTheme();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { register, reset, handleSubmit, formState: { errors }, } = useForm()

  // uid, category, date, title, description

  const handleTaskSubmit = async (data) => {
    const taskInfo = {
      uid: user.uid,
      category: data.category,
      date: data.date,
      title: data.title,
      desc: data.desc,
    };

    const response = await axiosPublic.post("/tasks", taskInfo);

    if (response.data.insertedId) {
      toast.success("Data Save Successful!");
      reset();
    }
  }

  return (
    <div className='items-center justify-center text-center max-w-5xl mx-auto p-5'>
      <div className={`${theme === "black" ? "" : ""}`}>

        <form onSubmit={handleSubmit(handleTaskSubmit)} className='flex flex-col border rounded-lg p-5 max-w-lg'>

          <input {...register("title", { required: true, maxLength: 50 })} type="text" placeholder="Title" className="input text-lg font-semibold rounded-none focus:outline-none p-0 border-none focus:border-none input-sm w-full" />
          {errors.title?.type === 'required' && <span className="text-red-500 font-medium"> Title is required. </span>}
          {errors.title?.type === 'maxLength' && <span className="text-red-500 font-medium"> The title should not exceed 50 characters. </span>}

          <input {...register("desc", { maxLength: 200 })} type="text" placeholder="Description" className="textarea text-sm rounded-none focus:outline-none p-0 border-none focus:border-none textarea-sm w-full" />
          {errors.desc?.type === 'maxLength' && <span className="text-red-500 font-medium"> The title should not exceed 200 characters. </span>}

          <div className="flex gap-3">

            <div className="">
              <div {...register("date", { required: true })} className={`border rounded-lg flex items-center justify-center ${theme === "black" ? "rounded-lg bg-black text-white" : "bg-white text-black"}`}> <DatePicker /> </div>
              {errors.date?.type === 'required' && <span className="text-red-500 font-medium"> Date is required. </span>}
            </div>

            <div className="">
              <select {...register("category", { required: true })} className={`select border-gray-200 font-normal select-sm focus:outline-none w-fit ${theme === "black" ? "rounded-lg bg-white text-black" : "text-black"}`}>
                <option disabled> Select Category </option>
                <option value="To Do" selected className={`${theme === "black" ? "rounded-lg bg-black text-white" : "bg-white text-black"}`}> To Do </option>
                <option value="In Progress" className={`${theme === "black" ? "rounded-lg bg-black text-white" : "bg-white text-black"}`}> In Progress </option>
                <option value="Done" className={`${theme === "black" ? "rounded-lg bg-black text-white" : "bg-white text-black"}`}> Done </option>
              </select>
              {errors.category?.type === 'required' && <span className="text-red-500 font-medium"> Category is required. </span>}
            </div>

            <button type="submit" className={`w-36 rounded-lg ${theme === "black" ? "rounded-lg bg-white text-black" : "bg-black text-white"}`}> + Add Task </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <table className="table">
          <tbody>
            <tr className='w-full'>
              <td className='w-8/12'>
                <p className="text-xs"> 07-12-2024 </p>
                <h2 className="text-xl font-semibold"> Cy Ganderton Lorem ipsum dolor sit amet consectetur </h2>
                <p className='text-sm'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quis earum, tempora iste officiis fugiat rerum dicta error amet sequi labore esse veniam. </p>
              </td>
              <td className="w-1/12">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="border border-gray-300 bg-none rounded-full p-2"> <IoIosMore /> </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                    <li><a>Edit</a></li>
                    <li><a>Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr className='w-full'>
              <td className='w-8/12'>
                <p className="text-xs"> 07-12-2024 </p>
                <h2 className="text-xl font-semibold"> Cy Ganderton Lorem ipsum dolor sit amet consectetur </h2>
                <p className='text-sm'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quis earum, tempora iste officiis fugiat rerum dicta error amet sequi labore esse veniam. </p>
              </td>
              <td className="w-1/12">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="border border-gray-300 bg-none rounded-full p-2"> <IoIosMore /> </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                    <li><a>Edit</a></li>
                    <li><a>Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table">
          <tbody>
            <tr className='w-full'>
              <td className='w-8/12'>
                <p className="text-xs"> 07-12-2024 </p>
                <h2 className="text-xl font-semibold"> Cy Ganderton Lorem ipsum dolor sit amet consectetur </h2>
                <p className='text-sm'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quis earum, tempora iste officiis fugiat rerum dicta error amet sequi labore esse veniam. </p>
              </td>
              <td className="w-1/12">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="border border-gray-300 bg-none rounded-full p-2"> <IoIosMore /> </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                    <li><a>Edit</a></li>
                    <li><a>Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr className='w-full'>
              <td className='w-8/12'>
                <p className="text-xs"> 07-12-2024 </p>
                <h2 className="text-xl font-semibold"> Cy Ganderton Lorem ipsum dolor sit amet consectetur </h2>
                <p className='text-sm'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quis earum, tempora iste officiis fugiat rerum dicta error amet sequi labore esse veniam. </p>
              </td>
              <td className="w-1/12">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="border border-gray-300 bg-none rounded-full p-2"> <IoIosMore /> </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                    <li><a>Edit</a></li>
                    <li><a>Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table">
          <tbody>
            <tr className='w-full'>
              <td className='w-8/12'>
                <p className="text-xs"> 07-12-2024 </p>
                <h2 className="text-xl font-semibold"> Cy Ganderton Lorem ipsum dolor sit amet consectetur </h2>
                <p className='text-sm'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quis earum, tempora iste officiis fugiat rerum dicta error amet sequi labore esse veniam. </p>
              </td>
              <td className="w-1/12">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="border border-gray-300 bg-none rounded-full p-2"> <IoIosMore /> </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                    <li><a>Edit</a></li>
                    <li><a>Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr className='w-full'>
              <td className='w-8/12'>
                <p className="text-xs"> 07-12-2024 </p>
                <h2 className="text-xl font-semibold"> Cy Ganderton Lorem ipsum dolor sit amet consectetur </h2>
                <p className='text-sm'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quis earum, tempora iste officiis fugiat rerum dicta error amet sequi labore esse veniam. </p>
              </td>
              <td className="w-1/12">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="border border-gray-300 bg-none rounded-full p-2"> <IoIosMore /> </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                    <li><a>Edit</a></li>
                    <li><a>Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <div className="grid grid-cols-1 gap-5">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-1" defaultChecked />
          <div className="collapse-title text-xl text-start font-medium">TO-DO</div>
          <div className="collapse-content">
            <table className="table">
              <tbody>
                <tr className='w-full'>
                  <td className='w-8/12'>
                    <p className="text-xs"> 07-12-2024 </p>
                    <h2 className="text-xl font-semibold"> Cy Ganderton Lorem ipsum dolor sit amet consectetur </h2>
                    <p className='text-sm'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quis earum, tempora iste officiis fugiat rerum dicta error amet sequi labore esse veniam. </p>
                  </td>
                  <td className="w-1/12">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="border border-gray-300 bg-none rounded-full p-2"> <IoIosMore /> </div>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                        <li><a>Edit</a></li>
                        <li><a>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr className='w-full'>
                  <td className='w-8/12'>
                    <p className="text-xs"> 07-12-2024 </p>
                    <h2 className="text-xl font-semibold"> Cy Ganderton Lorem ipsum dolor sit amet consectetur </h2>
                    <p className='text-sm'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quis earum, tempora iste officiis fugiat rerum dicta error amet sequi labore esse veniam. </p>
                  </td>
                  <td className="w-1/12">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="border border-gray-300 bg-none rounded-full p-2"> <IoIosMore /> </div>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                        <li><a>Edit</a></li>
                        <li><a>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl text-start font-medium">In Progress</div>
          <div className="collapse-content">
            <table className="table">
              <tbody>
                <tr className='w-full'>
                  <td className='w-8/12'>
                    <p className="text-xs"> 07-12-2024 </p>
                    <h2 className="text-xl font-semibold"> Cy Ganderton Lorem ipsum dolor sit amet consectetur </h2>
                    <p className='text-sm'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quis earum, tempora iste officiis fugiat rerum dicta error amet sequi labore esse veniam. </p>
                  </td>
                  <td className="w-1/12">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="border border-gray-300 bg-none rounded-full p-2"> <IoIosMore /> </div>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                        <li><a>Edit</a></li>
                        <li><a>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr className='w-full'>
                  <td className='w-8/12'>
                    <p className="text-xs"> 07-12-2024 </p>
                    <h2 className="text-xl font-semibold"> Cy Ganderton Lorem ipsum dolor sit amet consectetur </h2>
                    <p className='text-sm'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quis earum, tempora iste officiis fugiat rerum dicta error amet sequi labore esse veniam. </p>
                  </td>
                  <td className="w-1/12">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="border border-gray-300 bg-none rounded-full p-2"> <IoIosMore /> </div>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                        <li><a>Edit</a></li>
                        <li><a>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl text-start font-medium">Done</div>
          <div className="collapse-content">
            <table className="table">
              <tbody>
                <tr className='w-full'>
                  <td className='w-8/12'>
                    <p className="text-xs"> 07-12-2024 </p>
                    <h2 className="text-xl font-semibold"> Cy Ganderton Lorem ipsum dolor sit amet consectetur </h2>
                    <p className='text-sm'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quis earum, tempora iste officiis fugiat rerum dicta error amet sequi labore esse veniam. </p>
                  </td>
                  <td className="w-1/12">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="border border-gray-300 bg-none rounded-full p-2"> <IoIosMore /> </div>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                        <li><a>Edit</a></li>
                        <li><a>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr className='w-full'>
                  <td className='w-8/12'>
                    <p className="text-xs"> 07-12-2024 </p>
                    <h2 className="text-xl font-semibold"> Cy Ganderton Lorem ipsum dolor sit amet consectetur </h2>
                    <p className='text-sm'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quis earum, tempora iste officiis fugiat rerum dicta error amet sequi labore esse veniam. </p>
                  </td>
                  <td className="w-1/12">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="border border-gray-300 bg-none rounded-full p-2"> <IoIosMore /> </div>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                        <li><a>Edit</a></li>
                        <li><a>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
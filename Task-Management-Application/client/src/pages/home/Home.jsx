import React from 'react';
import useTheme from '../../theme/hook/useTheme';
import { IoIosMore } from "react-icons/io";

const Home = () => {

  const { theme } = useTheme();

  return (
    <div className='items-center justify-center text-center max-w-5xl mx-auto p-5'>
      <div className={`${theme === "black" ? "" : ""}`}>
        <button className=''> </button>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost bg-gray-100"> + Add New Task </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
            <li><a>Edit</a></li>
            <li><a>Delete</a></li>
          </ul>
        </div>
        <table className="table">
          <tbody>
            <tr className='w-full'>
              <td className='w-8/12'>
                <p className="text-xs"> 07-12-2024 </p>
                <h2 className="text-xl font-semibold"> Cy Ganderton Lorem ipsum dolor sit amet consectetur </h2>
                <p className='text-sm'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quis earum, tempora iste officiis fugiat rerum dicta error amet sequi labore esse veniam. </p>
              </td>
              <td className='w-3/12'>
                <select className={`select select-bordered w-full max-w-xs`}>
                  <option disabled selected> Select a Category </option>
                  <option> To Do </option>
                  <option> In Progress </option>
                  <option> Done </option>
                </select>
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
              <td className='w-4/12'>
                <select className={`select select-bordered w-full max-w-xs`}>
                  <option disabled selected> Select a Category </option>
                  <option> To Do </option>
                  <option> In Progress </option>
                  <option> Done </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
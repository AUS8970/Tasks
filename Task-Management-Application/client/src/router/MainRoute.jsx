import React from 'react';
import { Outlet } from 'react-router-dom';
import useTheme from '../theme/hook/useTheme';
import Navber from '../components/Navber';

const MainRoute = () => {

  const { theme } = useTheme();

  return (
    <div className={`font-roboto ${theme == "black" ? "bg-black text-white" : "bg-white text-black"}`}>
      <Navber />
      <Outlet />
    </div>
  );
};

export default MainRoute;
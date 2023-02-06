import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import useProductStore from "../../ZustandStore/store";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
const Main = () => {
  const [navshown, setNavshown] = useState(false);

  // products contain the owned courses
  const { Products, Courses, setToken, setCurrentUser, currentUser } = useProductStore((state) => state);

  // products contain all courses

  const navigate = useNavigate();

  return (
    <div className="w-full h-full overflow-x-hidden bg-gray-50">
      <Navbar currentUser={currentUser} />

      <div className="h-full max-w-screen-xl mx-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;

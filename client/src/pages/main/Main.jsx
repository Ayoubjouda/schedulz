import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useProductStore from "../../ZustandStore/store";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import api from "../../api/api";
const Main = () => {
  const [navshown, setNavshown] = useState(false);

  // products contain the owned courses
  const { Products, userCourses, setToken, setCurrentUser, currentUser, access_token, setUserCourses } =
    useProductStore((state) => state);

  // products contain all courses

  const navigate = useNavigate();
  useEffect(() => {
    api
      .get("courses/usercourses", {
        headers: {
          authorization: `Bearer ${access_token}`,
          ContentType: "multipart/form-data",
        },
      })
      .then((res) => setUserCourses(res.data.UserCourses))
      .catch((err) => console.log(err));
  }, [access_token, setUserCourses]);

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

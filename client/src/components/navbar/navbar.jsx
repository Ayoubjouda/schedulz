import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../ZustandStore/store";
// Profile Dropdown
const ProfileDropDown = (props) => {
  const [state, setState] = useState(false);
  const profileRef = useRef();
  const { Products, Courses, setToken, setCurrentUser, currentUser } = useProductStore((state) => state);
  const navigate = useNavigate();
  const navigation = [
    { title: "Dashboard", path: "javascript:void(0)" },
    { title: "Settings", path: "javascript:void(0)" },
    { title: "Log out", path: "javascript:void(0)" },
  ];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef?.current?.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
  }, []);

  return (
    <div className={`relative ${props.class} z-40 bg-white `}>
      <div className="flex items-center space-x-4 ">
        <div className="hidden lg:flex lg:flex-col lg:items-end">
          <span className="block font-bold uppercase">{currentUser.username}</span>
          <span className="block text-sm text-gray-500">{currentUser.userEmail}</span>
        </div>
        <button
          ref={profileRef}
          className="h-12 rounded-full outline-none min-w-[50px] ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-emerald-600"
          onClick={() => setState(!state)}
        >
          <img src={currentUser.profilePicture} className="object-cover w-full h-full rounded-full" alt="" />
        </button>
        <div className="lg:hidden">
          <span className="block">{currentUser.username}</span>
          <span className="block text-sm text-gray-500">{currentUser.userEmail}</span>
        </div>
      </div>
      <ul
        className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
          state ? "" : "lg:hidden"
        }`}
      >
        <li>
          <button
            className="block w-full text-gray-600 lg:hover:bg-gray-50 lg:p-2.5 "
            onClick={() => {
              navigate("profile");
              props.setMenuState();
            }}
          >
            Profile
          </button>
        </li>
        <li>
          <button
            className="block w-full text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
            onClick={() => {
              navigate("/");
              setCurrentUser(null);
              setToken(null);
            }}
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

const Navbar = ({ currentUser }) => {
  const [menuState, setMenuState] = useState(false);
  const navigate = useNavigate();
  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: "MarketPlace", path: "/dashboard/marketplace" },
    currentUser?.admin ? { title: "Admin", path: "/dashboard/admin" } : {},
    ,
  ];

  return (
    <nav className="bg-white border-b ">
      <div className="z-50 flex items-center max-w-screen-xl px-4 py-3 mx-auto space-x-8 md:px-8">
        <div className="flex-none lg:flex-initial">
          <button onClick={() => navigate("/")} className="text-xl font-bold cursor-pointer text-emerald-700">
            schedulz
          </button>
        </div>
        <div className="flex items-center justify-between flex-1">
          <div
            className={`bg-white absolute z-10 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
              menuState ? "" : "hidden"
            }`}
          >
            <ul className="z-10 mt-12 space-y-5 bg-white lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
              {navigation.map((item, idx) => (
                <li key={idx} className="z-10 w-10 text-gray-600 bg-white hover:text-gray-900">
                  <button
                    className="z-10 text-gray-600 bg-white hover:text-gray-900"
                    onClick={() => {
                      navigate(item.path);
                      setMenuState(!menuState);
                    }}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
            <ProfileDropDown class="mt-5 pt-5 border-t z-50 lg:hidden" setMenuState={() => setMenuState(!menuState)} />
          </div>
          <div className="flex items-center justify-end flex-1 space-x-2 sm:space-x-6">
            <form className="flex items-center p-2 space-x-2 rounded-md"></form>
            <ProfileDropDown
              class="hidden lg:block"
              nemuState={menuState}
              setMenuState={() => setMenuState(!menuState)}
            />
            <button className="block text-gray-400 outline-none lg:hidden" onClick={() => setMenuState(!menuState)}>
              {menuState ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

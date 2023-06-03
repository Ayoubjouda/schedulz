import { useNavigate } from 'react-router-dom';
import useCoursesStore from '../../ZustandStore/store';
import { Input } from 'components/ui/input';
import { MainNav } from 'components/main-nav';
import { UserNav } from 'components/user-nav';
import { Button } from 'components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
// Profile Dropdown

const Navbar = () => {
  // const [menuState, setMenuState] = useState(false);
  const navigate = useNavigate();
  // const [categorieMenuState, setCategorieMenuState] = useState(false);
  const { currentUser } = useCoursesStore((state) => state);
  // const { isLoading, error, data } = useQuery("categories", () => api.get("courses/getCategories"));

  return (
    <nav className="items-center h-auto px-4 mx-auto sm:px-8 md:space-x-6 ">
      <div className="border-b">
        <div className="flex items-center h-16 px-4">
          <MainNav className="mx-6" />
          <div className="flex items-center ml-auto space-x-4">
            <div>
              <Input
                type="search"
                placeholder="Search for anything"
                className="h-9 md:w-[100px] lg:w-[300px]"
              />
            </div>
            {currentUser ? (
              <div className="flex items-center ml-auto space-x-4">
                <div>
                  <Button variant="ghost">
                    <Heart className="w-4 h-4 " />
                  </Button>
                  <Button variant="ghost">
                    <ShoppingCart className="w-4 h-4 " />
                  </Button>
                </div>
                <UserNav />
              </div>
            ) : (
              <div className="space-x-4">
                <Button
                  variant="ghost"
                  className="font-semibold"
                  onClick={() => navigate('/login')}
                >
                  Log in
                </Button>
                <Button
                  variant="default"
                  className="font-semibold bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex justify-between ">
            <div
              onClick={() => navigate("/")}
              className="text-lg font-bold lg:ml-10 text-emerald-600"
            >
              Schedulz
            </div>
            <div
              onClick={() => navigate("/marketplace")}
              className="text-sm text-gray-500 cursor-pointer md:text-lg hover:text-emerald-600"
            >
              Courses
            </div>
            <div
              onClick={() => navigate("/login")}
              className="block w-32 px-6 py-3 text-center text-white rounded-md shadow-md bg-emerald-500 focus:shadow-none md:cursor-pointer"
            >
              Sign In
            </div>
          </div> */}
    </nav>
    // <nav className="bg-white border-b " onClick={categorieMenuState ? () => setCategorieMenuState(false) : null}>
    //   <div className="z-50 flex items-center max-w-screen-xl px-4 py-3 mx-auto space-x-8 md:px-8">
    //     <div className="flex-none lg:flex-initial">
    //       <button onClick={() => navigate("/")} className="text-xl font-bold cursor-pointer text-emerald-700">
    //         schedulz
    //       </button>
    //     </div>
    //     <div className="flex items-center justify-between flex-1">
    //       <div
    //         className={`bg-white absolute z-10 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none  ${
    //           menuState ? "" : "hidden"
    //         }`}
    //       >
    //         <ul className="z-10 mt-12 space-y-5 bg-white lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
    //           {navigation.map((item, idx) => (
    //             <li key={idx} className="z-10 text-gray-600 bg-white hover:text-gray-900">
    //               <button
    //                 className="z-10 text-gray-600 bg-white hover:text-gray-900"
    //                 onClick={() => {
    //                   navigate(item.path);
    //                   setMenuState(!menuState);
    //                 }}
    //               >
    //                 {item.title}
    //               </button>
    //             </li>
    //           ))}
    //           <div className="flex ">
    //             <div>
    //               <div className="relative dropend group">
    //                 <button
    //                   className="z-10 text-gray-600 bg-white hover:text-gray-900"
    //                   onClick={() => setCategorieMenuState(!categorieMenuState)}
    //                   type="button"
    //                 >
    //                   Courses
    //                 </button>
    //                 <ul
    //                   className={`
    //                   flex
    //                   flex-col
    //                   items-start

    //       dropdown-menu
    //       min-w-max
    //       absolute
    //       bg-white
    //       text-base
    //       z-50
    //       float-left
    //       py-2
    //       list-none
    //       text-left
    //       rounded-lg
    //       shadow-lg
    //       mt-1
    //       ${categorieMenuState ? "block" : "hidden"}
    //       m-0
    //       bg-clip-padding
    //       border-none
    //     `}
    //                   aria-labelledby="dropdownMenuButton1e"
    //                 >
    //                   {!isLoading && data?.data
    //                     ? data.data.map((categorie, index) => (
    //                         <li
    //                           key={index}
    //                           onClick={() => {
    //                             navigate(`/dashboard/marketplace/${categorie.categorieName}`);
    //                             setCategorieMenuState(!categorieMenuState);
    //                           }}
    //                           className="w-full"
    //                         >
    //                           <button className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent text-start dropdown-item whitespace-nowrap hover:bg-gray-100">
    //                             {categorie.categorieName}
    //                           </button>
    //                         </li>
    //                       ))
    //                     : null}
    //                   <li
    //                     onClick={() => {
    //                       navigate(`/dashboard/marketplace/Other`);
    //                       setCategorieMenuState(!categorieMenuState);
    //                     }}
    //                     className="w-full"
    //                   >
    //                     <button className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent text-start dropdown-item whitespace-nowrap hover:bg-gray-100">
    //                       Other
    //                     </button>
    //                   </li>
    //                 </ul>
    //               </div>
    //             </div>
    //           </div>
    //         </ul>
    //         <div className="block lg:hidden">
    //           <ProfileDropDown setMenuState={() => setMenuState(!menuState)} />
    //         </div>
    //       </div>
    //       <div className="flex items-center justify-end flex-1 space-x-2 sm:space-x-6 ">
    //         <form className="flex items-center p-2 space-x-2 rounded-md"></form>
    //         <div className="hidden lg:block">
    //           <ProfileDropDown nemuState={menuState} setMenuState={() => setMenuState(!menuState)} />
    //         </div>
    //         <button className="block text-gray-400 outline-none lg:hidden" onClick={() => setMenuState(!menuState)}>
    //           {menuState ? (
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="w-6 h-6"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //             >
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    //             </svg>
    //           ) : (
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="w-6 h-6"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //             >
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    //             </svg>
    //           )}
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;

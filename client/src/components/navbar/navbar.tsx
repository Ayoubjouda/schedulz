import { useNavigate } from 'react-router-dom';
import useCoursesStore from '../../ZustandStore/store';
import { Input } from 'components/ui/input';
import { MainNav } from 'components/main-nav';
import { UserNav } from 'components/user-nav';
import { Button } from 'components/ui/button';
import { ShoppingCart, Heart, Menu, Search } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { title: 'Courses', path: 'javascript:void(0)' },
  { title: 'Categories', path: 'javascript:void(0)' },
  { title: 'Guides', path: 'javascript:void(0)' },
  { title: 'Partners', path: 'javascript:void(0)' },
];

// Profile Dropdown

const Navbar = () => {
  const [menuState, setMenuState] = useState(false);
  const navigate = useNavigate();
  const [categorieMenuState, setCategorieMenuState] = useState(false);
  const { currentUser } = useCoursesStore((state) => state);
  // const { isLoading, error, data } = useQuery("categories", () => api.get("courses/getCategories"));

  return (
    <nav className="relative items-center h-auto mx-auto md:px-4 sm:px-8 md:space-x-6">
      <div className="border-b">
        <div className="flex items-center justify-between h-16 px-4">
          <MainNav className="mx-6" />
          <div className="items-center hidden ml-auto space-x-4 md:flex">
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
          <div className="flex items-center justify-center md:hidden">
            <Button variant="link">
              <Search size={20} />
            </Button>
            <Button
              variant={'link'}
              onClick={() => setMenuState(!menuState)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`z-50 flex items-center max-w-screen-xl px-4 py-3 mx-auto space-x-8 md:px-8 ${
          menuState ? '' : 'hidden'
        }`}
      >
        <div className="flex items-center justify-between flex-1">
          <div
            className={`bg-white absolute z-10 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none  `}
          >
            <ul className="z-10 space-y-5 bg-white lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
              {navigation.map((item, idx) => (
                <li
                  key={idx}
                  className="z-10 text-gray-600 bg-white hover:text-gray-900"
                >
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

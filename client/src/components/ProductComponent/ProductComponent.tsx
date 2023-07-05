import React, { useState } from 'react';
import useCoursesStore from '../../ZustandStore/store';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { FileArchive, Clock } from 'lucide-react';

import './ProductComponent.scss';

//! Add Error handling
type ProductComponentProps = {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    categorie: string;
    authorName: string;
    PostMedia: {
      id: number;
      filePath: string;
    }[];
  };
};
const ProductComponent = ({ product }: ProductComponentProps) => {
  const [modalState, setModalState] = useState(false);

  const navigate = useNavigate();
  const { userCourses, access_token, setUserCourses } = useCoursesStore(
    (state) => state
  );

  const isProductPushased = userCourses?.find(
    (el: any) => el.courseId === product.id
  );
  const handleBuyCourse = async () => {
    await api.post(
      'courses/buy',
      { courseId: product.id },
      {
        headers: {
          authorization: `Bearer ${access_token}`,
          ContentType: 'multipart/form-data',
        },
      }
    );

    api
      .get('courses/usercourses', {
        headers: {
          authorization: `Bearer ${access_token}`,
          ContentType: 'multipart/form-data',
        },
      })
      .then((res) => setUserCourses(res.data.UserCourses));
  };
  const handleCourseClick = async () => {
    if (access_token) {
      if (!isProductPushased) {
        setModalState(true);
        await handleBuyCourse();
      }
    } else {
      navigate('/login');
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10 ">
        <div className="flex flex-col duration-300 shadow-sm cursor-pointer w-80 hover:-translate-y-1 ">
          <div className="relative inline h-48 group">
            <img
              className="absolute object-cover w-full h-full rounded-t"
              src={`${product?.PostMedia[0]?.filePath}`}
              // src={`${process.env.REACT_APP_API_URL}${product?.PostMedia[1]?.filePath}`}
              alt="Product Preview"
            />

            {/* <div className="absolute bottom-0 flex flex-row justify-end w-full h-16 px-3 space-x-2 transition-all duration-200 ease-in-out delay-100 opacity-0 bg-none group-hover:opacity-100 group-hover:bg-gradient-to-t from-black/20 via-gray-800/20 to-transparent">
              <button className="px-1 my-auto transition-colors duration-200 rounded-full bg-gray-50/10 h-9 w-9 hover:bg-gray-50/20">
                <i
                  className="text-xl text-gray-200 transition-all duration-200 mdi mdi-playlist-plus hover:text-white"
                  title="Add to Bookmarks"
                ></i>
              </button>

              <button className="px-1 my-auto transition-colors duration-200 rounded-full bg-gray-50/10 h-9 w-9 hover:bg-gray-50/20">
                <i
                  className="p-1 text-xl text-gray-200 transition-all duration-200 mdi mdi-heart hover:text-white"
                  title="Add to Favorites"
                ></i>
              </button>
            </div> */}
          </div>
          <div className="flex flex-col gap-1 p-3 bg-white rounded-b">
            <div className="flex items-center justify-between">
              <div className="px-3 py-1 my-1 text-sm font-medium bg-yellow-100 rounded w-fit">
                {product.categorie}{' '}
              </div>
              <div className="flex flex-row items-center gap-1 group">
                <div>4.6</div>
                <i
                  className="text-sm transition-all duration-200 mdi mdi-star text-amber-400 hover:text-amber-500"
                  title="Worst"
                ></i>

                <div className="text-gray-400 text-xxs hover:underline">
                  (45)
                </div>
              </div>
            </div>

            <div className="font-semibold text-gray-900 truncate text-md hover:underline">
              {product.title}
            </div>

            <div className="flex flex-row justify-between mt-1 text-sm">
              <div className="flex items-center gap-1">
                <FileArchive
                  color="green"
                  size={15}
                />
                <div>35 Lessons</div>
              </div>
              <div className="flex items-center gap-1">
                <Clock
                  color="green"
                  size={15}
                />
                <div>13hr 30mins</div>
              </div>
            </div>

            <div className="flex flex-row items-center mt-2">
              <div className="flex flex-col flex-auto">
                <p
                  className="mt-1 text-gray-600 text-xxs"
                  title="34k Downlaods in this year"
                >
                  by {product.authorName}
                </p>
              </div>

              {/* <div className="flex flex-row justify-end flex-auto"></div> */}
              <p className="mr-2 font-bold text-gray-900 text-md">
                ${product.price}
              </p>
            </div>
            {access_token && isProductPushased ? (
              <button
                onClick={() =>
                  navigate(`/DashBoard/productdetails/${product.id}`)
                }
                className="px-3 py-3 mt-5 font-medium leading-5 text-white transition-colors duration-150 border border-transparent rounded-lg bg-emerald-600 active:bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:shadow-outline-purple"
              >
                Go to Course
              </button>
            ) : null}
          </div>
        </div>
      </div>
      {modalState ? (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setModalState(false)}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="mt-3">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-green-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mt-2 text-center">
                  <h4 className="text-lg font-medium text-gray-800">
                    Successfully accepted!
                  </h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Nunc eget lorem dolor sed viverra ipsum nunc.
                    Consequat id porta nibh venenatis.
                  </p>
                </div>
              </div>
              <div className="items-center gap-2 mt-3 sm:flex">
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={() => {
                    setModalState(false);
                    navigate(`/DashBoard/productdetails/${product.id}`);
                  }}
                >
                  Go to Course
                </button>
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={() => setModalState(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ProductComponent;

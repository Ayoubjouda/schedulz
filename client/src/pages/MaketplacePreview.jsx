import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { slice } from "lodash";
import { useQuery } from "react-query";
import api from "../api/api";
const MaketplacePreview = () => {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery("courses", () => api.get("courses/getAllCourses"));
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(10);
  const initialPosts = slice(data?.data, 0, index);
  const loadMore = () => {
    setIndex(index + 10);
    console.log(index);
    if (index >= data?.data.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  return (
    <>
      <header>
        <nav className="items-center h-auto max-w-screen-xl px-4 pt-5 mx-auto sm:px-8 md:space-x-6">
          <div className="flex justify-between ">
            <div onClick={() => navigate("/")} className="ml-10 text-lg font-bold cursor-pointer text-emerald-600">
              Schedulz
            </div>
            <div className="text-gray-500 cursor-pointer hover:text-emerald-600">MarketPlace</div>
            <div
              onClick={() => navigate("/login")}
              className="block w-32 px-6 py-3 text-center text-white rounded-md shadow-md bg-emerald-500 focus:shadow-none md:cursor-pointer"
            >
              Sign In
            </div>
          </div>
        </nav>
      </header>
      <div class="w-full max-w-screen-xl mx-auto sm:px-8">
        <div class="my-12">
          <div class="mb-12">
            <div class="flex flex-wrap -mx-4 justify-start">
              <div class="px-4 relative w-full text-left">
                <span class="text-blueGray-800 bg-blueGray-400 text-xs font-bold inline-block py-1 uppercase  last:mr-0 mr-1 leading-tight rounded px-2">
                  Have you seen us?
                </span>
                <h2 class="text-4xl font-bold mt-3 mb-1 text-blueGray-700">Our recent Courses</h2>
                <p class="mt-2 mb-4 text-xl leading-relaxed text-blueGray-400">
                  The time is now for it to be okay to be great. People in this world shun people for being great.
                </p>
              </div>
            </div>
          </div>
          <div class="items-center flex flex-wrap -mx-4 mb-0">
            {initialPosts?.map((el) => (
              <div class="px-4 mb-4 relative w-full lg:w-1/4">
                <div class="h-330-px overflow-hidden relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg transition-all duration-150 ease-in-out hover:z-1 hover:transform hover:scale-110 group rounded-lg mb-4">
                  <img
                    class=" w-full h-full transition-all duration-1000 object-cover ease-in-out group-hover:transform group-hover:scale-110 rounded-lg max-h-[300px] lg:h-[400px] "
                    src={`${process.env.REACT_APP_API_URL}${el?.PostMedia[1]?.filePath}`}
                    alt=""
                  />{" "}
                  <div class="absolute w-full h-full bg-black opacity-50 rounded-lg"></div>
                  <a href="javascr;">
                    <div class="absolute text-left p-6 bottom-0">
                      <h6 class="text-xl leading-normal mb-0 text-white opacity-75">{el.categorie}</h6>
                      <h5 class="text-2xl font-bold leading-tight mt-0 mb-2 text-white">{el.title}</h5>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
          {data?.data?.length === 0 && (
            <div className="my-10 text-2xl font-semibold text-center"> No Courses Availble</div>
          )}
          <div class="text-center">
            {!isCompleted ? (
              <button
                onClick={loadMore}
                class="inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold last:mr-0 mr-2  text-white bg-emerald-500 border-emerald-500 active:bg-emerald-600 active:border-emerald-600 text-sm px-6 py-2 shadow hover:shadow-lg rounded-md"
              >
                show more
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default MaketplacePreview;

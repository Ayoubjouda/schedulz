import React, { useState } from "react";

import ProductComponent from "../components/ProductComponent/ProductComponent";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { slice } from "lodash";
import { Spinner } from "@chakra-ui/react";
import api from "../api/api";

const MaketplacePreview = () => {
  const { isLoading, data } = useQuery("courses", () => api.get("courses/getAllCourses"));
  const [isCompleted, setIsCompleted] = useState(false);
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(8);
  const initialPosts = slice(data?.data, 0, index);
  const filtredPosts = initialPosts.filter((el) => el.title.toLowerCase().includes(search));
  const navigate = useNavigate();
  const loadMore = () => {
    setIndex(index + 8);

    if (index >= data?.data.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center w-full h-screen my-10">
        {" "}
        <Spinner size="xl" color="green.600" />
      </div>
    );
  }
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
      <div className="flex flex-col h-full max-w-screen-xl mx-auto bg-white">
        <div className="flex items-center justify-between w-full">
          <h2 class="m-6 text-2xl font-semibold text-gray-700 ">Marketplace</h2>
          <div class="pt-2 relative  text-gray-600 max-w-[200px] sm:max-w-none ">
            <input
              class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none    focus:border-emerald-600"
              type="search"
              name="search"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
              <svg
                class="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="justify-center pb-10 Courses-Section">
          {filtredPosts?.map((product, index) => (
            <ProductComponent product={product} index={index} />
          ))}
        </div>
        <div class="text-center ">
          {!isCompleted ? (
            <button
              onClick={loadMore}
              class="inline-block  mb-10 outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold last:mr-0 mr-2  text-white bg-emerald-500 border-emerald-500 active:bg-emerald-600 active:border-emerald-600 text-sm px-6 py-2 shadow hover:shadow-lg rounded-md"
            >
              show more
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MaketplacePreview;

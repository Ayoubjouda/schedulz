import React, { useState, useEffect } from "react";

import ProductComponent from "../../components/ProductComponent/ProductComponent";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { slice } from "lodash";
import { Spinner } from "@chakra-ui/react";
import api from "../../api/api";

const MarketPlace = () => {
  // const { Courses } = useProductStore((state) => state);
  const { id } = useParams();
  const { isLoading, data } = useQuery("courses", () => api.get("courses/getAllCourses"));
  const [isCompleted, setIsCompleted] = useState(false);
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(8);
  const filtredPosts = data?.data?.filter((el) => el.title.toLowerCase().includes(search));
  const categoriePosts = filtredPosts?.filter((el) => el.categorie.includes(!!id ? id : ""));
  const initialPosts = slice(categoriePosts, 0, index);
  useEffect(() => {
    if (index >= categoriePosts?.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [initialPosts]);

  const loadMore = () => {
    setIndex(index + 8);
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
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex items-center justify-between w-full ">
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

      <div className="justify-center pb-10 md:justify-start Courses-Section">
        {initialPosts?.map((product, index) => (
          <ProductComponent key={index} product={product} index={index} />
        ))}
      </div>
      <div class="text-center ">
        {categoriePosts.length === 0 ? (
          <div className="flex justify-center my-10 font-semibold"> No Courses Found.</div>
        ) : null}
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
  );
};

export default MarketPlace;

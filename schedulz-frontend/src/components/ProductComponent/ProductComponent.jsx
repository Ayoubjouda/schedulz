import React, { useState } from "react";
import useProductStore from "../../ZustandStore/store";
import { useNavigate } from "react-router-dom";
import "./ProductComponent.scss";

const ProductComponent = ({ product, index }) => {
  const [modalState, setModalState] = useState(false);
  const { title, subTitle, price } = product;
  const navigate = useNavigate();
  const myCourses = useProductStore((state) => state.Products);

  const addProduct = useProductStore((state) => state.addProduct);

  const ProductIsAdded = myCourses.includes(product);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center mt-10 "
        onClick={() =>
          ProductIsAdded
            ? navigate(`/DashBoard/productdetails/${product.id}`)
            : null
        }
      >
        <div
          onClick={() => {
            setModalState(true);
            if (!ProductIsAdded) {
              addProduct(product);
            }
          }}
          className="flex flex-col shadow-md cursor-pointer w-72 hover:-translate-y-1 duration-300 "
        >
          <div className="inline relative group h-48">
            <img
              className="absolute rounded-t object-cover h-full w-full"
              src={product.image}
              alt="Product Preview"
            />

            <div
              className="flex flex-row absolute justify-end
                        h-16 w-full bottom-0 px-3 space-x-2
                        bg-none opacity-0 group-hover:opacity-100
                        group-hover:bg-gradient-to-t from-black/20 via-gray-800/20 to-transparent 
                        transition-all ease-in-out duration-200 delay-100"
            >
              <button
                className="bg-gray-50/10 rounded-full 
                            px-1 h-9 w-9 my-auto hover:bg-gray-50/20
                            transition-colors duration-200"
              >
                <i
                  className="mdi mdi-playlist-plus text-xl text-gray-200
                                hover:text-white transition-all duration-200"
                  title="Add to Bookmarks"
                ></i>
              </button>

              <button
                className="bg-gray-50/10 rounded-full 
                            px-1 h-9 w-9 my-auto hover:bg-gray-50/20
                            transition-colors duration-200"
              >
                <i
                  className="mdi mdi-heart text-xl text-gray-200 p-1
                                hover:text-white transition-all duration-200"
                  title="Add to Favorites"
                ></i>
              </button>
            </div>
          </div>

          <div className="flex flex-col bg-white rounded-b p-3">
            <div className="text-sm font-semibold text-gray-900 hover:underline truncate">
              {title}
            </div>

            <div className="text-xxs text-gray-400 truncate mt-1">
              {subTitle}
            </div>

            <div className="text-sm text-gray-600 font-bold mt-4 mb-1">
              ${price}
            </div>

            <div className="flex flex-row mt-2">
              <div className="flex flex-col flex-auto">
                <div className="flex flex-row group">
                  <i
                    className="mdi mdi-star text-xs text-amber-400 
                                hover:text-amber-500 transition-all duration-200"
                    title="Worst"
                  ></i>

                  <i
                    className="mdi mdi-star text-xs text-amber-400 
                                hover:text-amber-500 transition-all duration-200"
                    title="Bad"
                  ></i>

                  <i
                    className="mdi mdi-star text-xs text-amber-400 
                                hover:text-amber-500 transition-all duration-200"
                    title="Not Bad"
                  ></i>

                  <i
                    className="mdi mdi-star text-xs text-amber-400 
                                hover:text-amber-500 transition-all duration-200"
                    title="Good"
                  ></i>

                  <i
                    className="mdi mdi-star text-xs text-amber-400 
                                hover:text-amber-500 transition-all duration-200"
                    title="Awesome"
                  ></i>

                  <div className="text-xxs text-gray-400 ml-1 hover:underline">
                    (45)
                  </div>
                </div>

                <div
                  className="text-xxs text-gray-400 mt-1"
                  title="34k Downlaods in this year"
                >
                  34k Downloads
                </div>
              </div>

              <div className="flex flex-row flex-auto justify-end"></div>
            </div>
          </div>
        </div>
      </div>
      {modalState ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
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
        ""
      )}
    </>
  );
};

export default ProductComponent;

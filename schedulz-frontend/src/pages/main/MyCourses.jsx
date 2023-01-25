import React from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import useProductStore from "../../ZustandStore/store";
const MyCourses = () => {
  const Products = useProductStore((state) => state.Products);
  return (
    <div className="MarkePlace-Container">
      <div className="MarketPlace-Title">
        <SectionTitle Title="My Courses" />
      </div>
      <div className="Courses-Section">
        {Products.length > 0 ? (
          Products.map((product) => <ProductComponent product={product} />)
        ) : (
          <div className="text-lg text-black flex h-full w-full justify-center">
            {" "}
            <i>No Courses avaible yet</i>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;

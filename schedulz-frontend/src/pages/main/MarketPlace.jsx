import React from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import useProductStore from "../../ZustandStore/store";

const MarketPlace = () => {
  const Courses = useProductStore((state) => state.Courses);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <h2 class="m-6 text-2xl font-semibold text-gray-700 ">Marketplace</h2>

      <div className="Courses-Section">
        {Courses.map((product, index) => (
          <ProductComponent product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default MarketPlace;

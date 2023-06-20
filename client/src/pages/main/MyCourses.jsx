import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProductComponent from '../../components/ProductComponent/ProductComponent';
import useCoursesStore from '../../ZustandStore/store';
const MyCourses = () => {
  const Products = useCoursesStore((state) => state.Products);
  return (
    <div className="MarkePlace-Container">
      <div className="MarketPlace-Title">
        <SectionTitle Title="My Courses" />
      </div>
      <div className="Courses-Section">
        {Products.length > 0 ? (
          Products.map((product, index) => (
            <ProductComponent
              key={index}
              product={product}
            />
          ))
        ) : (
          <div className="flex justify-center w-full h-full text-lg text-black">
            {' '}
            <i>No Courses avaible yet</i>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;

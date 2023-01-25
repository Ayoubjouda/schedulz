import React from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../../ZustandStore/store";
import { GoogleCalendar } from "datebook";

import "./ProductDetails.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const Products = useProductStore((state) => state.Products);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  // this function returns the product that has the same id from useparams
  const currentProduct = Products.find((obj) => obj.id == id);

  // this function returns the start and the end of the event , also it retuns the 30 day period
  const addOneMonthToDate = () => {
    var now = new Date();
    var now2 = new Date();

    var start;
    var end;
    var monthEnd = now2.setMonth(now2.getMonth() + 1);
    if (id == 0) {
      if (now.getHours() >= 17) now.setDate(now.getDate() + 1);
      start = now.setHours(17, 0, 0);
      end = now.setHours(18, 0, 0);
    } else if (id == 1) {
      if (now.getHours() >= 20) now.setDate(now.getDate() + 1);
      start = now.setHours(20, 0, 0);
      end = now.setHours(22, 0, 0);
    } else if (id == 2) {
      if (now.getHours() >= 10) now.setDate(now.getDate() + 1);
      start = now.setHours(10, 0, 0);
      end = now.setHours(12, 0, 0);
    }

    return { start, end, monthEnd };
  };
  const { start, end, monthEnd } = addOneMonthToDate();

  // configuration of each calendar
  const configMeditation = {
    title: "Meditation",
    location: "The Bar, New York, NY",
    description: "Let's blow off some steam with a tall cold one!",
    start: new Date(start),
    end: new Date(end),
    recurrence: {
      frequency: "WEEKLY",
      weekdays: ["MO", "TU", "WE", "TH", "FR", "SA"],
      end: new Date(monthEnd),
    },
  };
  const configPowerLifting = {
    title: "PowerLifting",
    start: new Date(start),
    end: new Date(end),
    recurrence: {
      frequency: "WEEKLY",
      weekdays: ["MO", "WE", "TH"],
      end: new Date(monthEnd),
    },
  };
  const configPython = {
    title: "Learn python",
    start: new Date(start),
    end: new Date(end),
    recurrence: {
      frequency: "WEEKLY",
      weekdays: ["MO", "TU", "WE", "TH", "FR", "SA"],
      start: new Date(),
      end: new Date(monthEnd),
    },
  };

  // array that contains all the calendar configurations
  const calendarConfigArray = [
    configPython,
    configMeditation,
    configPowerLifting,
  ];

  const Calendar = new GoogleCalendar(calendarConfigArray[id]);

  const CalendarLink = Calendar.render();
  return (
    <div className="ProductDetails-Container ">
      <div className="product-image">
        <img src={currentProduct.image} alt="" />
      </div>

      <div className="my-5 ml-5 text-2xl ">{currentProduct.title}</div>

      <div className="mb-5 ml-5 text-gray-400">{currentProduct.subTitle}</div>
      <div className="Course-info sm:flex">
        <div className="w-full Course-Content">
          <div className="Content-Header">Course Content</div>
          {currentProduct.content.map((el) => (
            <div className="Content ">
              <div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.99967 13.6668C10.6816 13.6668 13.6663 10.6821 13.6663 7.00016C13.6663 3.31826 10.6816 0.333496 6.99967 0.333496C3.31778 0.333496 0.333008 3.31826 0.333008 7.00016C0.333008 10.6821 3.31778 13.6668 6.99967 13.6668ZM6.33338 9.94009L10.8048 5.46869L9.86198 4.52588L6.33338 8.05447L4.13812 5.85921L3.19531 6.80202L6.33338 9.94009Z"
                    fill="#18A661"
                  />
                </svg>
              </div>
              <div>{el}</div>
            </div>
          ))}
        </div>
        <div className="Course-Details">
          <div className="Details-Header">Details</div>
          <div className="Details-item">Beginner Level</div>
          <div className="Details-item">Approximately 8 months to complete</div>
          <div className="Details-item">English</div>
        </div>
      </div>
      <div className="z-10 ml-10 text-black ">Click Here &darr;</div>
      <div className="button-Container">
        <button
          className="px-5 py-2.5 text-white bg-emerald-600 rounded-md duration-150 hover:bg-emerald-700 active:shadow-lg"
          role="link"
          onClick={() => openInNewTab(CalendarLink)}
        >
          Export Calendar
        </button>
        <button className="px-5 py-2.5 text-white bg-emerald-600 rounded-md duration-150 hover:bg-emerald-700 active:shadow-lg">
          Go to course
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

import React from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import useProductStore from "../../ZustandStore/store";
import { GoogleCalendar } from "datebook";
import { useGetFetchQuery } from "../../hooks/reactQueryHooks";
import { useQuery } from "react-query";
import moment from "moment";
import api from "../../api/api";
import { Spinner } from "@chakra-ui/react";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const { isLoading, error, data } = useQuery("courses", () => api.get("courses/getAllCourses"));
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        {" "}
        <Spinner size="xl" color="green.600" />
      </div>
    );
  const Products = data?.data;

  // this function returns the product that has the same id from useparams
  const currentProduct = Products?.find((obj) => obj.id === id);

  // this function returns the start and the end of the event , also it retuns the 30 day period
  // const addOneMonthToDate = () => {
  // var now = new Date();
  // var now2 = new Date();
  // var start = new Date();
  // var end = new Date();
  // var monthEnd = now2.setMonth(now2.getMonth() + 1);
  // if (id == 0) {
  //   if (now.getHours() >= 17) now.setDate(now.getDate() + 1);
  //   start = now.setHours(17, 0, 0);
  //   end = now.setHours(18, 0, 0);
  // } else if (id == 1) {
  //   if (now.getHours() >= 20) now.setDate(now.getDate() + 1);
  //   start = now.setHours(20, 0, 0);
  //   end = now.setHours(22, 0, 0);
  // } else if (id == 2) {
  //   if (now.getHours() >= 10) now.setDate(now.getDate() + 1);
  //   start = now.setHours(10, 0, 0);
  //   end = now.setHours(12, 0, 0);
  // }
  // return { start, end, monthEnd };
  // };
  // const { start, end, monthEnd } = addOneMonthToDate();

  // configuration of each calendar
  // const configMeditation = {
  //   title: "Meditation",
  //   location: "The Bar, New York, NY",
  //   description: "Let's blow off some steam with a tall cold one!",
  //   start: new Date(start),
  //   end: new Date(end),
  //   recurrence: {
  //     frequency: "WEEKLY",
  //     weekdays: ["MO", "TU", "WE", "TH", "FR", "SA"],
  //     end: new Date(monthEnd),
  //   },
  // };
  // const configPowerLifting = {
  //   title: "PowerLifting",
  //   start: new Date(start),
  //   end: new Date(end),
  //   recurrence: {
  //     frequency: "WEEKLY",
  //     weekdays: ["MO", "WE", "TH"],
  //     end: new Date(monthEnd),
  //   },
  // };
  // const configPython = {
  //   title: "Learn python",
  //   start: new Date(start),
  //   end: new Date(end),
  //   recurrence: {
  //     frequency: "WEEKLY",
  //     weekdays: ["MO", "TU", "WE", "TH", "FR", "SA"],
  //     start: new Date(),
  //     end: new Date(monthEnd),
  //   },
  // };

  // array that contains all the calendar configurations
  // const calendarConfigArray = [configPython, configMeditation, configPowerLifting];

  // const Calendar = new GoogleCalendar(calendarConfigArray[id]);

  // const CalendarLink = Calendar.render();

  if (currentProduct === undefined) navigate("/notfound");

  return (
    <div className="mx-4 lg:mx-0 ProductDetails-Container ">
      <div className="flex-col Course-info">
        <div class="w-full">
          <section class="pt-12 relative">
            <div class="container mx-auto px-4">
              <div class="flex flex-wrap -mx-4">
                <div class="mx-auto relative w-full md:w-8/12">
                  <h6 class="text-lg mt-2 mb-0 text-blueGray-400">
                    {moment(Date(currentProduct.createdAt)).calendar()}
                  </h6>
                  <h3 class="text-3xl font-bold leading-normal mt-0 mb-2">{currentProduct.title}</h3>
                </div>
              </div>
            </div>
          </section>
          <section class="pt-12 relative">
            <div class="container mx-auto px-4">
              <div class="flex flex-wrap -mx-4 justify-center">
                <img
                  src={`${process.env.REACT_APP_API_URL}${currentProduct.PostMedia?.[1].filePath}`}
                  alt="..."
                  class="rounded-lg shadow-lg w-850-px max-h-[500px]"
                />
              </div>
            </div>
          </section>
          <section class="pt-12 relative">
            <div class="container mx-auto px-4">
              <div class="flex flex-wrap -mx-4">
                <div class="mx-auto relative w-full md:w-8/12">
                  <p class="mb-4 text-lg text-blueGray-500">{currentProduct.description}</p>

                  <p class="text-xl text-blueGray-500 mx-0 my-12 block pl-4  border-blueGray-200 border-l-2">
                    "And thank you for turning my personal jean jacket into a couture piece."
                    <br />
                    <small class="mt-2 font-semibold text-blueGray-700">Kanye West, Producer.</small>
                  </p>

                  <h3 class="text-3xl font-bold leading-normal mt-0 mb-2">
                    Using AI Technologie to get the most of your learning
                  </h3>
                  <p class="mb-4 text-lg text-blueGray-500">
                    This is the paragraph where you can write more details about your product. Keep you user engaged by
                    providing meaningful information. Remember that by this time, the user is curious, otherwise he
                    wouldn't scroll to get here. Add a button if you want the user to see more. We are here to make life
                    better.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section class="pt-12 relative">
            <div class="w-full">
              <div class="flex justify-center w-full">
                <div class="w-full transform duration-500 transition-all ease-in-out mx-auto block">
                  <img
                    alt="..."
                    src={`${process.env.REACT_APP_API_URL}${currentProduct.PostMedia?.[0].filePath}`}
                    class="h-auto mx-auto rounded-lg shadow-xl w-450-px"
                  />
                </div>
              </div>
            </div>
          </section>
          <section class="pt-12 relative">
            <div class="container mx-auto px-4">
              <div class="flex flex-wrap -mx-4">
                <div class="mx-auto relative w-full md:w-8/12">
                  <h3 class="text-3xl font-bold leading-normal mt-0 mb-2">Course Details</h3>
                  <p class="mb-4 text-lg text-blueGray-500">
                    We are here to make life better. And now I look and look around and there’s so many Kanyes I've been
                    trying to figure out the bed design for the master bedroom at our Hidden Hills compound... and thank
                    you for turning my personal jean jacket into a couture piece. I speak yell scream directly at the
                    old guard on behalf of the future. daytime All respect prayers and love to Phife’s family Thank you
                    for so much inspiration
                  </p>
                  <p class="mb-4 text-lg text-blueGray-500">
                    Thank you Anna for the invite thank you to the whole Vogue team And I love you like Kanye loves
                    Kanye Pand Pand Panda I've been trying to figure out the bed design for the master bedroom at our
                    Hidden Hills compound...The Pablo pop up was almost a pop up of influence. All respect prayers and
                    love to Phife’s family Thank you for so much inspiration daytime I love this new Ferg album! The
                    Life of Pablo is now available for purchase I have a dream. Thank you to everybody who made The Life
                    of Pablo the number 1 album in the world! I'm so proud of the nr #1 song in the country. Panda! Good
                    music 2016!
                  </p>
                  <p class="mb-4 text-lg text-blueGray-500">
                    I love this new Ferg album! The Life of Pablo is now available for purchase I have a dream. Thank
                    you to everybody who made The Life of Pablo the number 1 album in the world! I'm so proud of the nr
                    #1 song in the country. Panda! Good music 2016!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* <div className="w-full Course-Content">
          <div className="Content-Header">Course Content</div> */}
        {/* {currentProduct.content.map((el) => (
            <div className="Content ">
              <div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          ))} */}
        {/* </div> */}
        {/* <div className="Course-Details">
          <div className="Details-Header">Details</div>
          <div className="Details-item">Beginner Level</div>
          <div className="Details-item">Approximately 8 months to complete</div>
          <div className="Details-item">English</div>
        </div> */}
        <div className="flex justify-center w-full h-full gap-10 ">
          <button
            className="px-5 py-2.5 my-10 text-white bg-emerald-600 rounded-md duration-150 hover:bg-emerald-700 active:shadow-lg"
            role="link"
          >
            Export Calendar
          </button>
          <button className="px-5 py-2.5 my-10 text-white bg-emerald-600 rounded-md duration-150 hover:bg-emerald-700 active:shadow-lg">
            Go to course
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

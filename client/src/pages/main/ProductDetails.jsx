import React, { useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import useProductStore from "../../ZustandStore/store";
import { GoogleCalendar, ICalendar } from "datebook";
import { useGetFetchQuery } from "../../hooks/reactQueryHooks";
import { useQuery } from "react-query";
import moment from "moment";
import api from "../../api/api";
import { Spinner } from "@chakra-ui/react";
import * as FileSaver from "file-saver";
const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { access_token } = useProductStore((state) => state);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  function formatDate(dateString) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}-${month}-${day}`;
  }

  const { isLoading, error, data } = useQuery("userCourses", () =>
    api
      .post(
        "courses/getcoursebyid",
        { courseId: id },
        {
          headers: {
            authorization: `Bearer ${access_token}`,
            ContentType: "multipart/form-data",
          },
        }
      )
      .then((res) => res.data.response)
  );
  console.log(data);
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        {" "}
        <Spinner size="xl" color="green.600" />
      </div>
    );
  if (error)
    return <div className="flex items-center justify-center h-full"> Course Not found Please Purchase a course</div>;
  const courseSchedule = JSON.parse(data?.schedule);
  // console.log(courseSchedule);
  // const Products = data?.data;

  // this function returns the product that has the same id from useparams
  // const currentProduct = Products?.find((obj) => obj.id === id);

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

  const convertToDate = (date) => {
    if (date.length > 8) {
      return moment(date).toDate();
    } else {
      return new Date(formatDate(date));
    }
  };

  const exportToLink = () => {
    const scheduleData = courseSchedule?.data[0];
    console.log(scheduleData);
    const options = {
      ...scheduleData,
      // title: data?.title,
      start: new Date(scheduleData.start),
      end: new Date(scheduleData.end),
      // description: "",
    };
    console.log(options);
    const googleCalendar = new GoogleCalendar(options);
    const url = googleCalendar.render();
    openInNewTab(url);
  };

  const saveIcsFile = () => {
    const scheduleData = courseSchedule?.data;

    const icalendar = new ICalendar({
      title: data?.title,
      location: scheduleData[0].location,
      description: scheduleData[0].description,
      start: convertToDate(scheduleData[0].startDate),
      end: convertToDate(scheduleData[0].endDate),
    });
    scheduleData.forEach((el, index) => {
      if (index === 0) return;
      icalendar.addEvent(
        new ICalendar({
          title: data?.title,
          location: el.location,
          description: el.description,
          start: convertToDate(el.startDate),
          end: convertToDate(el.endDate),
        })
      );
    });
    const ics = icalendar.render();
    console.log(ics);
    const blob = new Blob([ics], {
      type: "text/calendar",
    });

    FileSaver.saveAs(blob, "my-calendar-event.ics");
  };
  if (error) navigate("/notfound");

  return (
    <div className="mx-4 lg:mx-0 ProductDetails-Container ">
      <div className="flex-col Course-info">
        <div className="w-full">
          <section className="relative pt-12">
            <div className="container px-4 mx-auto">
              <div className="flex flex-wrap -mx-4">
                <div className="relative w-full mx-auto md:w-8/12">
                  <h6 className="mt-2 mb-0 text-lg text-blueGray-400">{moment(Date(data?.createdAt)).calendar()}</h6>
                  <h3 className="mt-0 mb-2 text-3xl font-bold leading-normal">{data?.title}</h3>
                </div>
              </div>
            </div>
          </section>
          <section className="relative pt-12">
            <div className="container px-4 mx-auto">
              <div className="flex flex-wrap justify-center -mx-4">
                <img
                  src={`${process.env.REACT_APP_API_URL}${data?.PostMedia?.[1]?.filePath}`}
                  alt="..."
                  className="rounded-lg shadow-lg w-850-px max-h-[500px]"
                />
              </div>
            </div>
          </section>
          <section className="relative pt-12">
            <div className="container px-4 mx-auto">
              <div className="flex flex-wrap -mx-4">
                <div className="relative w-full mx-auto md:w-8/12">
                  <p className="mb-4 text-lg text-blueGray-500">{data?.description}</p>

                  <p className="block pl-4 mx-0 my-12 text-xl border-l-2 text-blueGray-500 border-blueGray-200">
                    "And thank you for turning my personal jean jacket into a couture piece."
                    <br />
                    <small className="mt-2 font-semibold text-blueGray-700">Kanye West, Producer.</small>
                  </p>

                  <h3 className="mt-0 mb-2 text-3xl font-bold leading-normal">
                    Using AI Technologie to get the most of your learning
                  </h3>
                  <p className="mb-4 text-lg text-blueGray-500">
                    This is the paragraph where you can write more details about your product. Keep you user engaged by
                    providing meaningful information. Remember that by this time, the user is curious, otherwise he
                    wouldn't scroll to get here. Add a button if you want the user to see more. We are here to make life
                    better.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="relative pt-12">
            <div className="w-full">
              <div className="flex justify-center w-full">
                <div className="block w-full mx-auto transition-all duration-500 ease-in-out transform">
                  <img
                    alt="..."
                    src={`${process.env.REACT_APP_API_URL}${data?.PostMedia?.[0]?.filePath}`}
                    className="h-auto mx-auto rounded-lg shadow-xl max-h-64 w-450-px"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="relative pt-12">
            <div className="container px-4 mx-auto">
              <div className="flex flex-wrap -mx-4">
                <div className="relative w-full mx-auto md:w-8/12">
                  <h3 className="mt-0 mb-2 text-3xl font-bold leading-normal">Course Details</h3>
                  <p className="mb-4 text-lg text-blueGray-500">
                    We are here to make life better. And now I look and look around and there’s so many Kanyes I've been
                    trying to figure out the bed design for the master bedroom at our Hidden Hills compound... and thank
                    you for turning my personal jean jacket into a couture piece. I speak yell scream directly at the
                    old guard on behalf of the future. daytime All respect prayers and love to Phife’s family Thank you
                    for so much inspiration
                  </p>
                  <p className="mb-4 text-lg text-blueGray-500">
                    Thank you Anna for the invite thank you to the whole Vogue team And I love you like Kanye loves
                    Kanye Pand Pand Panda I've been trying to figure out the bed design for the master bedroom at our
                    Hidden Hills compound...The Pablo pop up was almost a pop up of influence. All respect prayers and
                    love to Phife’s family Thank you for so much inspiration daytime I love this new Ferg album! The
                    Life of Pablo is now available for purchase I have a dream. Thank you to everybody who made The Life
                    of Pablo the number 1 album in the world! I'm so proud of the nr #1 song in the country. Panda! Good
                    music 2016!
                  </p>
                  <p className="mb-4 text-lg text-blueGray-500">
                    I love this new Ferg album! The Life of Pablo is now available for purchase I have a dream. Thank
                    you to everybody who made The Life of Pablo the number 1 album in the world! I'm so proud of the nr
                    #1 song in the country. Panda! Good music 2016!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-center w-full h-full gap-10 ">
          {courseSchedule.type === "File" ? (
            <button
              className="px-5 py-2.5 my-10 text-white bg-emerald-600 rounded-md duration-150 hover:bg-emerald-700 active:shadow-lg"
              role="link"
              onClick={saveIcsFile}
            >
              Export Calendar
            </button>
          ) : (
            <button
              className="px-5 py-2.5 my-10 text-white bg-emerald-600 rounded-md duration-150 hover:bg-emerald-700 active:shadow-lg"
              role="link"
              onClick={exportToLink}
            >
              Export to Google Calendar
            </button>
          )}

          <button
            onClick={() => openInNewTab(data?.videoUrl)}
            className="px-5 py-2.5 my-10 text-white bg-emerald-600 rounded-md duration-150 hover:bg-emerald-700 active:shadow-lg"
          >
            Go to course
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

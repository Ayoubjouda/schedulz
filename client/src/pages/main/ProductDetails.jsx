import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCoursesStore from '../../ZustandStore/store';
import { GoogleCalendar, ICalendar } from 'datebook';

import { useQuery } from 'react-query';
import moment from 'moment';
import api from '../../api/api';
import { Spinner } from '@chakra-ui/react';
import * as FileSaver from 'file-saver';
const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { access_token } = useCoursesStore((state) => state);

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };
  function formatDate(dateString) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}-${month}-${day}`;
  }

  const { isLoading, error, data } = useQuery('userCourses', () =>
    api
      .post(
        'courses/getcoursebyid',
        { courseId: id },
        {
          headers: {
            authorization: `Bearer ${access_token}`,
            ContentType: 'multipart/form-data',
          },
        }
      )
      .then((res) => res.data.response)
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        {' '}
        <Spinner
          size="xl"
          color="green.600"
        />
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        {' '}
        Course Not found Please Purchase a course
      </div>
    );
  const courseSchedule = JSON.parse(data?.schedule);

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
      type: 'text/calendar',
    });

    FileSaver.saveAs(blob, 'my-calendar-event.ics');
  };
  if (error) navigate('/notfound');

  return (
    <div className="mx-4 lg:mx-0 ProductDetails-Container ">
      <div className="flex-col Course-info">
        <div className="w-full">
          <section className="relative pt-12">
            <div className="container px-4 mx-auto">
              <div className="flex flex-wrap -mx-4">
                <div className="relative w-full mx-auto md:w-8/12">
                  {/* <h6 className="mt-2 mb-0 text-lg text-blueGray-400">{moment(Date(data?.createdAt)).calendar()}</h6> */}
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
                  <h3 className="mt-0 mb-2 text-3xl font-bold leading-normal">
                    {data?.title}
                  </h3>
                </div>
              </div>
            </div>
          </section>

          <section className="relative pt-12">
            <div className="container px-4 mx-auto">
              <div className="flex flex-wrap -mx-4">
                <div className="relative w-full mx-auto md:w-8/12">
                  <h3 className="mt-0 mb-2 text-lg leading-normal font-regular">
                    {data?.description}
                  </h3>
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
        </div>

        <div className="flex justify-center w-full h-full gap-10 ">
          {courseSchedule.type === 'File' ? (
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

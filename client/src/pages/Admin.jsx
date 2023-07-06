import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import api from '../api/api';
import moment from 'moment';
import { Spinner } from '@chakra-ui/react';
import useCoursesStore from '../ZustandStore/store';
import Pagination from '../components/Pagination/Pagination';
import { useToast } from '@chakra-ui/react';

const Admin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { access_token } = useCoursesStore((state) => state);
  const toast = useToast();

  const { isLoading, error, data } = useQuery('courses', () =>
    api.get('courses/getAllCourses')
  );
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10;
  const [search, setSearch] = useState('');
  const filtredData = data?.data.filter((el) =>
    el.title.toLowerCase().includes(search)
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtredData?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(data?.data?.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleDelete = async (courseId) => {
    api
      .post(
        'courses/deleteCourse',
        { id: courseId },
        {
          headers: {
            authorization: `Bearer ${access_token}`,
            ContentType: 'multipart/form-data',
          },
        }
      )
      .then((res) => {
        queryClient.invalidateQueries({ queryKey: ['courses'] });
        toast({
          title: `Course Deleted Successfuly`,
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: `Error Deleting the Course`,
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
      });
  };

  return (
    <div>
      <div className="flex w-full h-screen ">
        <div className="flex flex-col flex-1 ">
          <main className="h-full pb-16 ">
            <div className="container grid px-6 mx-auto ">
              <h2 className="my-6 text-2xl font-semibold text-gray-700 ">
                Admin
              </h2>

              <div className="flex flex-col items-end">
                <button
                  onClick={() => navigate('/dashboard/addcourse')}
                  className="px-5 py-3 font-medium leading-5 text-white transition-colors duration-150 border border-transparent rounded-lg bg-emerald-600 active:bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:shadow-outline-purple"
                >
                  Add course
                </button>
                <div className="pt-2 relative  text-gray-600 max-w-[200px] sm:max-w-none ">
                  <input
                    className="h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                    type="search"
                    name="search"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute top-0 right-0 mt-5 mr-4"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600 fill-current"
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

              <div className="w-full mt-10 overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full whitespace-no-wrap">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 ">
                        <th className="px-4 py-3">Course</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Instructor</th>
                        <th className="px-4 py-3">Created At</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {data && !isLoading
                        ? currentPosts.map((el, index) => (
                            <tr
                              key={index}
                              className="text-gray-700 bg-white "
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                  <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                    <img
                                      className="object-cover w-full h-full rounded-full"
                                      src={
                                        data?.data?.length > 0
                                          ? `${process.env.REACT_APP_API_URL}${el?.PostMedia?.[1]?.filePath}`
                                          : ''
                                      }
                                      alt=""
                                      loading="lazy"
                                    />
                                    <div
                                      className="absolute inset-0 rounded-full shadow-inner"
                                      aria-hidden="true"
                                    ></div>
                                  </div>
                                  <div>
                                    <p className="font-semibold">{el?.title}</p>
                                    <p className="text-xs text-gray-600 ">
                                      {el?.categorie}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                $ {el?.price}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {el?.instructor}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {moment(Date(el?.createdAt)).format('ll')}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center space-x-4 text-sm">
                                  <button
                                    onClick={() =>
                                      navigate(`/Dashboard/editcourse/${el.id}`)
                                    }
                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg text-emerald-600 focus:outline-none focus:shadow-outline-gray"
                                    aria-label="Edit"
                                  >
                                    <svg
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                    </svg>
                                  </button>
                                  <button
                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg text-emerald-600 focus:outline-none focus:shadow-outline-gray"
                                    aria-label="Delete"
                                    onClick={() => handleDelete(el?.id)}
                                  >
                                    <svg
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>

                  {!data && isLoading ? (
                    <div className="flex justify-center my-10">
                      {' '}
                      <Spinner
                        size="xl"
                        color="green.600"
                      />
                    </div>
                  ) : null}
                  {data?.data?.length === 0 && !isLoading ? (
                    <div className="flex justify-center my-10 font-semibold">
                      {' '}
                      No Courses Found.
                    </div>
                  ) : null}
                </div>
                <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9 ">
                  <span className="flex items-center col-span-3">
                    Showing {currentPosts?.length} of {data?.data?.length}
                  </span>
                  <span className="col-span-2"></span>

                  <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                    <nav aria-label="Table navigation">
                      <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={data?.data?.length}
                        paginate={paginate}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        currentPage={currentPage}
                      />
                    </nav>
                  </span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;

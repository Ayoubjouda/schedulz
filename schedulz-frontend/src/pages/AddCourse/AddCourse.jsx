import React from "react";
import { Input, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
const AddCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {};
  return (
    <div class=" min-h-screen w-full bg-gray-50 flex-col ">
      <h2 class="m-6 text-2xl font-semibold text-gray-700 ">Add Course</h2>

      <div class="px-4 mb-10">
        <p class="mt-1 text-sm text-gray-600">
          This information will be displayed publicly so be careful what you share.
        </p>
      </div>

      <div class="mt-5 md:col-span-2 md:mt-0 ">
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block my-2 text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Input placeholder="Title" {...register("title")} />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block my-2 text-sm font-medium text-gray-700 ">
                    Instructor
                  </label>
                  <Input placeholder="Instructor" {...register("instructor")} />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block my-2 text-sm font-medium text-gray-700 ">
                    Skill Level
                  </label>
                  <Input placeholder="Skill Level" {...register("Skill Level")} />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block my-2 text-sm font-medium text-gray-700 ">
                    language
                  </label>
                  <Input placeholder="language" {...register("language")} />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="country" className="block my-2 text-sm font-medium text-gray-700 ">
                    Captions
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("Captions")}
                  >
                    <option>Yes</option>
                    <option>no</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block my-2 text-sm font-medium text-gray-700 ">
                    Categorie
                  </label>
                  <Input placeholder="Categorie" {...register("categorie")} />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label htmlFor="country" className="block my-2 text-sm font-medium text-gray-700 ">
                    Description
                  </label>
                  <Textarea placeholder="Course Description" {...register("description")} />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="country" className="block my-2 text-sm font-medium text-gray-700 ">
                    Video Url
                  </label>
                  <Input placeholder="https://youtube.com" {...register("url")} />
                </div>

                <div className="flex flex-col col-span-3 ">
                  <label className="my-2 text-sm font-medium text-gray-700 ">Video thumbnail</label>
                  <div className="flex ">
                    <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                      <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      {...register("image")}
                      className="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col col-span-3 ">
                  <label className="my-2 text-sm font-medium text-gray-700 ">Agenda OverView</label>
                  <div className="flex ">
                    <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                      <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      className="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;

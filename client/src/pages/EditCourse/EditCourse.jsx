import React, { useEffect } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";

import { Input, Textarea, NumberInput, NumberInputField } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import { useQuery } from "react-query";
import useProductStore from "../../ZustandStore/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const MAX_FILE_SIZE = 3000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const SKILL_LEVEL = ["Beginner", "Intermediate", "Advanced", "Expert"];
const validateSchema = z.object({
  title: z.string().min(6),
  instructor: z.string().min(3),
  skillLevel: z.string().min(3),
  language: z.string().min(3),
  captions: z.string(),
  categorie: z.string(),
  description: z.string().min(6),
  videoUrl: z.string().min(6),
  price: z.number(),
  thumbnail: z
    .any()
    .refine((files) => files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`) // this should be greater than or equals (>=) not less that or equals (<=)
    .refine(
      (files) => files?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  overview: z
    .any()
    .refine((files) => files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 3MB.`) // this should be greater than or equals (>=) not less that or equals (<=)
    .refine(
      (files) => files?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

const EditCourse = () => {
  const access_token = useProductStore((state) => state.access_token);
  const { id } = useParams();

  const toast = useToast();
  const formData = new FormData();
  const navigate = useNavigate();
  const {
    isLoading: isCourseLoading,
    courseError,
    data: courseData,
  } = useQuery("courses", () => api.get("courses/getAllCourses"));
  const Courses = courseData?.data;

  const currentCourse = Courses?.find((obj) => obj.id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(validateSchema),

    defaultValues: {
      title: "",
      instructor: "",
      skillLevel: "",
      language: "",
      captions: "",
      categorie: "",
      description: "",
      videoUrl: "",
      price: "",
    },
  });
  useEffect(() => {
    let defaults = {
      title: currentCourse?.title,
      instructor: currentCourse?.instructor,
      skillLevel: currentCourse?.skillLevel,
      language: currentCourse?.language,
      captions: currentCourse?.captions === true ? "Yes" : "No",
      categorie: currentCourse?.categorie,
      description: currentCourse?.description,
      videoUrl: currentCourse?.videoUrl,
      price: currentCourse?.price,
    };
    reset(defaults);
  }, [currentCourse, reset]);
  const { isLoading, error, data } = useQuery("categories", () => api.get("courses/getCategories"));
  if (!currentCourse && !isCourseLoading) {
    navigate("/notfound");
  }
  console.log(currentCourse);
  if (isLoading) return <Spinner />;

  if (isLoading || isCourseLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spinner size="xl" color="green.600" />{" "}
      </div>
    );

  const onSubmit = async (data) => {
    formData.append("data", JSON.stringify(data));
    formData.append("overview", data.overview[0]);
    formData.append("thumbnail", data.thumbnail[0]);
    if (!formData) return;

    toast({
      title: `Error Creating the Course`,
      status: "error",
      description: `Still in Development`,
      position: "top-right",
      isClosable: true,
    });

    // api
    //   .post("courses/addcourse", formData, {
    //     headers: {
    //       authorization: `Bearer ${access_token}`,
    //       ContentType: "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     if (res.data.statusCode === 201) {
    //       toast({
    //         title: `Course Created Successfuly`,
    //         status: "success",
    //         position: "top-right",
    //         isClosable: true,
    //       });
    //       navigate("/dashboard/admin");
    //     } else {
    //       toast({
    //         title: `Error Creating the Course`,
    //         status: "error",
    //         position: "top-right",
    //         isClosable: true,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast({
    //       title: `Error Creating the Course`,
    //       status: "error",
    //       description: `${err?.message}`,
    //       position: "top-right",
    //       isClosable: true,
    //     });
    //   });
  };

  return (
    <div className="flex-col w-full min-h-screen bg-gray-50">
      <h2 className="pt-6 ml-6 text-2xl font-semibold text-gray-700 ">Add Course</h2>

      <div className="px-4 mb-10">
        <p className="mt-1 text-sm text-gray-600">
          This information will be displayed publicly so be careful what you share.
        </p>
      </div>

      <div className="mt-5 md:col-span-2 md:mt-0 ">
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block my-2 text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Input placeholder="Title" {...register("title")} />
                  {errors.title && <p class="text-red-500 text-xs italic">Please enter a valid Title.</p>}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block my-2 text-sm font-medium text-gray-700 ">
                    Instructor
                  </label>
                  <Input placeholder="Instructor" {...register("instructor")} defaultValue={currentCourse?.title} />
                  {errors.instructor && <p class="text-red-500 text-xs italic">Please enter a valid Name.</p>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block my-2 text-sm font-medium text-gray-700 ">
                    Skill Level
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("skillLevel")}
                  >
                    {SKILL_LEVEL.map((el, index) => (
                      <option key={index}>{el}</option>
                    ))}
                  </select>

                  {errors.skillLevel && <p class="text-red-500 text-xs italic">Please enter a valid SkillLevel.</p>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block my-2 text-sm font-medium text-gray-700 ">
                    language
                  </label>
                  <Input placeholder="language" {...register("language")} defaultValue={currentCourse?.title} />
                  {errors.language && <p class="text-red-500 text-xs italic">this field can't be empty</p>}
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
                    {...register("captions")}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block my-2 text-sm font-medium text-gray-700 ">
                    Categorie
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("categorie")}
                  >
                    {!isLoading && data?.data
                      ? data.data.map((categorie, index) => <option key={index}>{categorie.categorieName}</option>)
                      : null}
                    <option> Other</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label htmlFor="country" className="block my-2 text-sm font-medium text-gray-700 ">
                    Description
                  </label>

                  <Textarea placeholder="Course Description" {...register("description")} />
                  {errors.description && <p class="text-red-500 text-xs italic">this field can't be empty</p>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="country" className="block my-2 text-sm font-medium text-gray-700 ">
                    Video Url
                  </label>
                  <Input placeholder="https://youtube.com" {...register("videoUrl")} />
                  {errors.videoUrl && <p class="text-red-500 text-xs italic">this field can't be empty</p>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="country" className="block my-2 text-sm font-medium text-gray-700 ">
                    Price
                  </label>
                  <Input {...register("price", { valueAsNumber: true })} type="number" />

                  {errors.price && <p class="text-red-500 text-xs italic">please enter a correct number</p>}
                </div>

                <div className="flex flex-col col-span-3 ">
                  <label className="my-2 text-sm font-medium text-gray-700 ">Video thumbnail</label>
                  <div className="flex ">
                    <span className="w-12 h-12 ">
                      <img
                        className="inline-block w-12 h-12 rounded-full ring-2 ring-emerald-500"
                        src={`${process.env.REACT_APP_API_URL}${currentCourse.PostMedia?.[1].filePath}`}
                        alt="overView"
                      />
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      {...register("thumbnail")}
                      className="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    />
                  </div>
                  {errors.thumbnail && <p class="text-red-500 text-xs italic">{errors.thumbnail.message}</p>}
                </div>
                <div className="flex flex-col col-span-3 ">
                  <label className="my-2 text-sm font-medium text-gray-700 ">Agenda OverView</label>
                  <div className="flex ">
                    <span className="w-12 h-12 ">
                      <img
                        className="inline-block w-12 h-12 rounded-full ring-2 ring-emerald-500"
                        src={`${process.env.REACT_APP_API_URL}${currentCourse.PostMedia?.[0].filePath}`}
                        alt="overView"
                      />
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      {...register("overview")}
                      className="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    />
                  </div>
                  {errors.overview && <p class="text-red-500 text-xs italic">{errors.overview.message}</p>}
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

export default EditCourse;

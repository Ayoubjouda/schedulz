import React, { useState } from 'react';
import {
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import api from '../api/api';
import { MultiSelect } from '@mantine/core';
import icsToJson from 'ics-to-json';
import { useQuery } from 'react-query';
import useCoursesStore from '../ZustandStore/store';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { TimeRangeInput } from '@mantine/dates';

import { Radio, RadioGroup, Stack, Button } from '@chakra-ui/react';
const MAX_FILE_SIZE = 3000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const DaysData = [
  { value: 'MO', label: 'Lundi' },
  { value: 'TU', label: 'Mardi' },
  { value: 'WE', label: 'Mercredi' },
  { value: 'TH', label: 'Jeudi' },
  { value: 'FR', label: 'Vendredi' },
  { value: 'SA', label: 'Samedi' },
  { value: 'SU', label: 'Diamnche' },
];

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
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 3MB.`
    ) // this should be greater than or equals (>=) not less that or equals (<=)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  overview: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 3MB.`
    ) // this should be greater than or equals (>=) not less that or equals (<=)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  schedulefile: z.any(),
});

const SKILL_LEVEL = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const AddCourse = () => {
  const [daysValue, setValue] = useState([]);
  const [timeValue, setTimeValue] = useState([]);
  const [FileError, setFileError] = useState(false);

  const access_token = useCoursesStore((state) => state.access_token);
  const toast = useToast();
  const [scheduleType, setScheduleType] = React.useState('File');
  const formData = new FormData();
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery('categories', () =>
    api.get('courses/getCategories')
  );
  // console.log("days :", daysValue.length, "Time :", new Date(timeValue[0]));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(validateSchema),
  });
  const onSubmit = async (data) => {
    if (
      (data.scheduleFile?.length === 0 && scheduleType === 'File') ||
      (scheduleType === 'Custom' &&
        (daysValue.length === 0 || timeValue.length === 0))
    ) {
      setFileError(true);
      return;
    } else {
      setFileError(false);
    }

    if (scheduleType === 'Custom') {
      const config = {
        type: 'Custom',
        data: [
          {
            title: data.title,
            start: new Date(timeValue[0]),
            end: new Date(timeValue[1]),
            recurrence: {
              frequency: 'WEEKLY',
              weekdays: daysValue,
            },
          },
        ],
      };
      formData.append('schedule', JSON.stringify(config));
    } else {
      const covertedFile = await convertIcsFileToJson(data.schedulefile[0]);
      const config = {
        type: 'File',
        data: covertedFile,
      };
      formData.append('schedule', JSON.stringify(config));
    }
    console.log('can send schedule');

    formData.append('data', JSON.stringify(data));
    formData.append('overview', data.overview[0]);
    formData.append('thumbnail', data.thumbnail[0]);
    if (!formData) return;
    api
      .post('courses/addcourse', formData, {
        headers: {
          authorization: `Bearer ${access_token}`,
          ContentType: 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data.statusCode === 201) {
          toast({
            title: `Course Created Successfuly`,
            status: 'success',
            position: 'top-right',
            isClosable: true,
          });
          navigate('/dashboard/admin');
        } else {
          toast({
            title: `Error Creating the Course`,
            status: 'error',
            position: 'top-right',
            isClosable: true,
          });
        }
      })
      .catch((err) =>
        toast({
          title: `Error Creating the Course`,
          status: 'error',
          description: `${err?.message}`,
          position: 'top-right',
          isClosable: true,
        })
      );
  };

  const convertIcsFileToJson = async (fileLocation) => {
    const icsData = await fileLocation.text();
    // Convert
    const data = icsToJson(icsData);
    return data;
  };

  return (
    <div className="flex-col w-full h-full">
      <h2 className="pt-6 ml-6 text-2xl font-semibold text-gray-700 ">
        Add Course
      </h2>

      <div className="px-4 mb-10">
        <p className="mt-1 text-sm text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <div className="mt-5 md:col-span-2 md:mt-0 ">
        <form
          action="#"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="shadow sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block my-2 text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <Input
                    placeholder="Title"
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="text-xs italic text-red-500">
                      Please enter a valid Title.
                    </p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block my-2 text-sm font-medium text-gray-700 "
                  >
                    Instructor
                  </label>
                  <Input
                    placeholder="Instructor"
                    {...register('instructor')}
                  />
                  {errors.instructor && (
                    <p className="text-xs italic text-red-500">
                      Please enter a valid Name.
                    </p>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block my-2 text-sm font-medium text-gray-700 "
                  >
                    Skill Level
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register('skillLevel')}
                  >
                    {SKILL_LEVEL.map((el, index) => (
                      <option key={index}>{el}</option>
                    ))}
                  </select>

                  {errors.skillLevel && (
                    <p className="text-xs italic text-red-500">
                      Please enter a valid SkillLevel.
                    </p>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block my-2 text-sm font-medium text-gray-700 "
                  >
                    language
                  </label>
                  <Input
                    placeholder="language"
                    {...register('language')}
                  />
                  {errors.language && (
                    <p className="text-xs italic text-red-500">
                      this field can&quot;t be empty
                    </p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block my-2 text-sm font-medium text-gray-700 "
                  >
                    Captions
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register('captions')}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block my-2 text-sm font-medium text-gray-700 "
                  >
                    Categorie
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register('categorie')}
                  >
                    {!isLoading && data?.data
                      ? data.data.map((categorie, index) => (
                          <option key={index}>{categorie.categorieName}</option>
                        ))
                      : null}
                    <option> Other</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="country"
                    className="block my-2 text-sm font-medium text-gray-700 "
                  >
                    Description
                  </label>
                  <Textarea
                    placeholder="Course Description"
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="text-xs italic text-red-500">
                      this field can&quot;t be empty
                    </p>
                  )}
                </div>

                <div className="flex flex-col col-span-6 sm:col-span-3 ">
                  <label className="my-2 text-sm font-medium text-gray-700 ">
                    Video thumbnail
                  </label>
                  <div className="flex ">
                    <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                      <svg
                        className="w-full h-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      {...register('thumbnail')}
                      className="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    />
                  </div>
                  {errors.thumbnail && (
                    <p className="text-xs italic text-red-500">
                      {errors.thumbnail.message}
                    </p>
                  )}
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

import React from "react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../ZustandStore/store";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import jwt_decode from "jwt-decode";

import _ from "lodash";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../api/api";

const MAX_FILE_SIZE = 3000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const formData = new FormData();
const validateSchema = z
  .object({
    firstName: z
      .union([z.string().length(0), z.string().min(4)])
      .optional()
      .transform((e) => (e === "" ? null : e)),
    lastName: z
      .union([z.string().length(0), z.string().min(4)])
      .optional()
      .transform((e) => (e === "" ? null : e)),
    currentPassword: z
      .union([z.string().length(0), z.string().min(6)])
      .optional()
      .transform((e) => (e === "" ? null : e)),
    newPassword: z
      .union([z.string().length(0), z.string().min(6)])
      .optional()
      .transform((e) => (e === "" ? null : e)),
    confirmPassword: z
      .union([z.string().length(0), z.string().min(6)])
      .optional()
      .transform((e) => (e === "" ? null : e)),
    profilePicture: z
      .any()
      .optional()
      .refine((files) => files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`) // this should be greater than or equals (>=) not less that or equals (<=)
      .refine(
        (files) => files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

const Profile = () => {
  const { currentUser, access_token, setCurrentUser, setToken } = useProductStore((state) => state);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    },
    resolver: zodResolver(validateSchema),
  });
  function removeEmpty(obj) {
    return Object.entries(obj)
      .filter(([_, v]) => v != null)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  }
  const onSubmit = async (data) => {
    const filtredData = removeEmpty(data);

    delete filtredData.profilePicture;
    delete filtredData.confirmPassword;
    formData.append("data", JSON.stringify(filtredData));
    if (data.profilePicture.length > 0) formData.append("profilePicture", data.profilePicture[0]);

    if (_.isEmpty(filtredData) && !formData.has("profilePicture")) return;
    api
      .post("user/editprofile", formData, {
        headers: {
          authorization: `Bearer ${access_token}`,
          ContentType: "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.statusCode === 201) {
          setToken(res.data.access_token);
          const user = jwt_decode(res.data.access_token);
          setCurrentUser(user);
          toast({
            title: `Profile Editted Successfuly`,
            status: "success",
            position: "top-right",
            isClosable: true,
          });
          // navigate("/dashboard/admin");
        } else {
          toast({
            title: `Error Editing Profile`,
            status: "error",
            position: "top-right",
            isClosable: true,
          });
        }
        formData.delete("data");
        formData.delete("profilePicture");
      })
      .catch((err) => {
        toast({
          title: `Error Editing Profile`,
          status: "error",
          description: err?.response?.data?.message ? err?.response?.data?.message : err?.message,
          position: "top-right",
          isClosable: true,
        });
        formData.delete("data");
        formData.delete("profilePicture");
      });
  };

  return (
    <div className="z-0 flex-1 xl:overflow-y-auto">
      <div className="max-w-3xl px-4 py-10 mx-auto sm:px-6 lg:py-12 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-blue-gray-900">Account</h1>

        <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <h2 className="text-xl font-medium text-blue-gray-900">Profile</h2>
              <p className="mt-1 text-sm text-blue-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-blue-gray-900">First name</label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                {...register("firstName")}
                className="block w-full mt-1 rounded-md shadow-sm border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-blue-gray-900">Last name</label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                {...register("lastName")}
                className="block w-full mt-1 rounded-md shadow-sm border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-blue-gray-900">Username</label>
              <div className="flex mt-1 rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 border border-r-0 rounded-l-md border-blue-gray-300 bg-blue-gray-50 text-blue-gray-500 sm:text-sm">
                  schedulz.com/
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  disabled
                  value={currentUser.username}
                  className="flex-1 block w-full min-w-0 rounded-none rounded-r-md border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-blue-gray-900">Photo</label>
              <div className="flex items-center mt-1">
                <img
                  className="inline-block object-cover w-12 h-12 rounded-full"
                  src={currentUser.profilePicture}
                  alt=""
                />
                <div className="z-0 flex ml-4">
                  <div className="relative z-0 flex items-center px-3 py-2 bg-white border rounded-md shadow-sm cursor-pointer border-blue-gray-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 hover:bg-blue-gray-50">
                    <label className="relative z-0 text-sm font-medium pointer-events-none text-blue-gray-900">
                      <span>Change</span>
                      <span className="sr-only"> user photo</span>
                    </label>
                    <input
                      id="user-photo"
                      name="user-photo"
                      type="file"
                      {...register("profilePicture")}
                      className="absolute inset-0 z-0 w-full h-full border-gray-300 rounded-md opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 pt-8 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <h2 className="text-xl font-medium text-blue-gray-900">Security</h2>
              <p className="mt-1 text-sm text-blue-gray-500">This information is private do not share it.</p>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-blue-gray-900">Current Passwond</label>
              <input
                type="password"
                name="Current Passwond"
                id="Current Passwond"
                {...register("currentPassword")}
                placeholder="********"
                className="block w-full mt-1 rounded-md shadow-sm border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.currentPassword && <p class="text-red-500 text-xs italic">Short Password</p>}
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-blue-gray-900">New Passwond</label>
              <input
                type="password"
                name="New Passwond"
                id="New Passwond"
                {...register("newPassword")}
                placeholder="********"
                className="block w-full mt-1 rounded-md shadow-sm border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.newPassword && <p class="text-red-500 text-xs italic">Short Password</p>}
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-blue-gray-900">Confirm Passwond</label>
              <input
                type="password"
                name="Confirm Passwond"
                id="Confirm Passwond"
                {...register("confirmPassword")}
                placeholder="********"
                className="block w-full mt-1 rounded-md shadow-sm border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.confirmPassword && <p class="text-red-500 text-xs italic">Passwords don't match.</p>}
            </div>
          </div>

          <div className="flex justify-end pt-8">
            <button
              type="button"
              onClick={() => navigate("/dashboard/marketplace")}
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

import React from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import { Spinner, useToast } from "@chakra-ui/react";
import GoogleSigninButton from "../../components/GoogleSigninButton/GoogleSigninButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUp = () => {
  const validateSchema = z
    .object({
      username: z.string().min(4).max(10),
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password doesn't match",
      path: ["confirmPassword"],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(validateSchema),
  });

  const handleRegister = (data) => {
    console.log(data);
    console.log(errors.username);
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 ">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl ">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              alt="Office"
              src={
                "https://images.pexels.com/photos/3585090/pexels-photo-3585090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              alt="Office"
              src="https://images.pexels.com/photos/3585090/pexels-photo-3585090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 ">
                Create account
              </h1>
              <form onSubmit={handleSubmit(handleRegister)}>
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    username
                  </span>
                  <input
                    type="text"
                    {...register("username")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 mb-2"
                    placeholder="username"
                    required
                  />
                  {errors.username && (
                    <p class="text-red-500 text-xs italic">
                      Please choose another username.
                    </p>
                  )}
                </label>
                <label className="block text-sm ">
                  <span className="text-gray-700 dark:text-gray-400">
                    Email
                  </span>
                  <input
                    type="email"
                    {...register("email")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 "
                    placeholder="email"
                    required
                  />
                  {errors.email && (
                    <p class="text-red-500 text-xs italic">
                      Please choose another username.
                    </p>
                  )}
                </label>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Password
                  </span>
                  <input
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 "
                    placeholder="********"
                    {...register("password")}
                    required
                  />
                  {errors.password && (
                    <p class="text-red-500 text-xs italic">
                      Please choose a strong password.
                    </p>
                  )}
                </label>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Confirm password
                  </span>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 "
                    placeholder="********"
                    required
                  />
                  {errors.confirmPassword && (
                    <p class="text-red-500 text-xs italic">
                      Passwords don't match.
                    </p>
                  )}
                </label>

                <div className="flex mt-6 text-sm">
                  <label className="flex items-center dark:text-gray-400">
                    <input
                      type="checkbox"
                      className="text-emerald-600 form-checkbox focus:border-emerald-400 focus:outline-none focus:shadow-outline-emerald dark:focus:shadow-outline-emerald"
                    />
                    <span className="ml-2">
                      I agree to the{" "}
                      <span className="underline">privacy policy</span>
                    </span>
                  </label>
                </div>
                <button
                  className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 border border-transparent rounded-lg bg-emerald-600 active:bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:shadow-outline-purple"
                  type="submit"
                >
                  Create account
                </button>
              </form>

              <hr className="my-8" />

              <GoogleSigninButton />

              <p className="mt-4">
                <a className="text-sm font-medium text-emerald-600 dark:text-emerald-400 ">
                  Already have an account? Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

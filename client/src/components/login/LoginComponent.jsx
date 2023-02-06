import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import GoogleSigninButton from "../GoogleSigninButton/GoogleSigninButton";
import { Spinner, useToast } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import jwt_decode from "jwt-decode";
import useProductStore from "../../ZustandStore/store";

const validateSchema = z.object({
  email: z.string().min(4),
  password: z.string().min(6),
});

const LoginComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(validateSchema),
  });

  const { setToken, setCurrentUser } = useProductStore((state) => state);
  const toast = useToast();

  const handleLogin = async (data) => {
    setLoading(true);
    api
      .post("auth/signin", { ...data }, { timeout: 4000 })
      .then((res) => {
        setLoading(false);
        if (res.data.access_token) {
          setToken(res.data.access_token);
          const user = jwt_decode(res.data.access_token);
          setCurrentUser(user);
          toast({
            title: `Welcome ${user.username}.`,
            description: "Login Successful",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/dashboard/marketplace");
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err?.response?.data?.message) {
          toast({
            title: "Login Failure.",
            description: err.response.data.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Login Failure.",
            description: "Networ Error",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 ">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl ">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="https://images.pexels.com/photos/3585090/pexels-photo-3585090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="https://images.pexels.com/photos/3585090/pexels-photo-3585090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <form onSubmit={handleSubmit(handleLogin)}>
                <h1 className="mb-4 text-xl font-semibold text-gray-700">Login</h1>
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">Email</span>
                  <input
                    type="text"
                    id="first_name"
                    {...register("email")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="email"
                    required
                  />
                  {errors.username && <p class="text-red-500 text-xs italic">Please enter a valid username.</p>}
                </label>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">Password</span>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="********"
                    type="password"
                    {...register("password")}
                    required
                  />
                  {errors.password && <p class="text-red-500 text-xs italic">Please enter a valid password.</p>}
                </label>

                <button
                  className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 border border-transparent rounded-lg bg-emerald-600 active:bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:shadow-outline-purple disabled:bg-gray-400"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? <Spinner /> : " Log In"}
                </button>
              </form>
              <hr className="my-8" />

              <GoogleSigninButton />

              <p className="mt-4">
                <button
                  className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                  onClick={() => navigate("/register")}
                >
                  Create account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

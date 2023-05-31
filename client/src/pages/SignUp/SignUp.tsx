import { useForm } from "react-hook-form";
import { Spinner } from "@chakra-ui/react";
import GoogleSigninButton from "../../components/GoogleSigninButton/GoogleSigninButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/button";
import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form";
import { RegisterSchema, RegisterSchemaType } from "lib/validators/formValidators";
import { useSignUp } from "hooks/useSignUp";

const SignUp = () => {
  const navigate = useNavigate();

  const form = useForm<any>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
  });

  const { signUpMutation, isLoading } = useSignUp();

  const handleRegister = async (data: RegisterSchemaType) => {
    const { username, email, password } = data;
    signUpMutation({ username, email, password });
  };

  return (
    <div className="flex items-center h-auto bg-gray-50 ">
      <div className="flex-1 h-full mx-auto overflow-hidden bg-white ">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-[calc(100vh-65px)] md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-screen dark:hidden"
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 ">Create account</h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => handleRegister(data))}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email address" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your password" type="password" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Confirm your password" type="password" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="policy"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="text-emerald-600 form-checkbox focus:border-emerald-400 focus:outline-none focus:shadow-outline-emerald dark:focus:shadow-outline-emerald"
                              {...field}
                            />
                            <Label>Accept terms and conditions</Label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full font-semibold bg-emerald-600 hover:bg-emerald-800"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : null}
                    Sign up
                  </Button>
                </form>
              </Form>

              <hr className="my-8" />

              <GoogleSigninButton />

              <p className="mt-4">
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Already have an account ? Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

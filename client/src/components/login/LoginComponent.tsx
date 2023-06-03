import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import GoogleSigninButton from '../GoogleSigninButton/GoogleSigninButton';
import { Spinner } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import {
  loginSchemaValidator,
  LoginSchemaType,
} from 'lib/validators/formValidators';
import { useSignIn } from 'hooks/useSignIn';

const LoginComponent = () => {
  const navigate = useNavigate();

  const form = useForm<LoginSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchemaValidator),
  });

  const { signInMutation, isLoading } = useSignIn();

  const handleLogin = async (data: LoginSchemaType) => {
    signInMutation(data);
  };

  return (
    <div className="flex h-auto bg-gray-50 ">
      <div className="flex-1 h-full mx-auto overflow-hidden bg-white ">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-[calc(100vh-65px)] dark:hidden"
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleLogin)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email address"
                            {...field}
                          />
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
                          <Input
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full font-semibold bg-emerald-600 hover:bg-emerald-800"
                    disabled={isLoading}
                    type="submit"
                  >
                    {isLoading ? <Spinner size="sm" /> : 'Login'}
                  </Button>
                </form>
              </Form>
              <hr className="my-8" />
              <GoogleSigninButton />
              <p className="mt-4">
                <button
                  className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                  onClick={() => navigate('/register')}
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

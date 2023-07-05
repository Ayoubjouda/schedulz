import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Spinner, useToast } from '@chakra-ui/react';

import jwt_decode from 'jwt-decode';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import useCoursesStore from '../../ZustandStore/store';

const GoogleSigninButton = () => {
  const toast = useToast();
  const [loading, setLoading] = useState();
  const { setToken, setCurrentUser, access_token, currentUser } =
    useCoursesStore((state) => state);

  const handleUserInfo = (token) => {
    if (token) {
      setToken(token);
      const user = jwt_decode(token);
      if (!user) throw Error('no current user');
      setCurrentUser(user);
      toast({
        title: `Welcome ${user.username}`,
        description: 'Login Successful',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate('/dashboard/marketplace');
    }
  };

  const navigate = useNavigate();
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        api
          .post('auth/googlesignin', {
            access_token: credentialResponse.credential,
          })
          .then((res) => {
            setLoading(false);
            if (res.data?.access_token) {
              handleUserInfo(res?.data?.access_token);
            }
          })
          .catch((err) =>
            toast({
              title: 'Login error.',
              description: err.response?.data?.message
                ? err.response?.data?.message
                : 'Google Network Error',
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          );
      }}
      onError={() => {
        toast({
          title: 'Login error.',
          description: 'err',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }}
      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-600 transition-colors duration-150 bg-white border border-gray-300 rounded-lg active:bg-blue-600 hover:bg-blue-50 focus:outline-none focus:shadow-outline-gray"
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 48 48"
            className="mr-3"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            ></path>
            <path
              fill="#FF3D00"
              d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            ></path>
          </svg>
          Sign in With Google
        </>
      )}
    </GoogleLogin>
  );
};

export default GoogleSigninButton;

import useCoursesStore from 'ZustandStore/store';
import api from '../api/api';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import jwt_decode from 'jwt-decode';

async function signUp(
  username: string,
  email: string,
  password: string
): Promise<SignUpResponse> {
  const { data } = await api.post(
    'auth/signup',
    { username, email, password },
    { timeout: 4000 }
  );

  return data;
}

interface SignUpResponse {
  access_token: string;
}

export function useSignUp() {
  const { setToken, setCurrentUser } = useCoursesStore((state) => state);
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate: signUpMutation, isLoading } = useMutation<
    SignUpResponse,
    unknown,
    { email: string; password: string; username: string },
    unknown
  >(({ username, email, password }) => signUp(username, email, password), {
    onSuccess: (data) => {
      if (data.access_token) {
        setToken(data.access_token);
        const user: User = jwt_decode(data.access_token);
        setCurrentUser(user);
        toast({
          title: `Welcome ${user.username}.`,
          description: 'Account Created Successfuly',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        navigate('/dashboard/marketplace');
      }
    },

    onError: (error: any) => {
      toast({
        title: 'Login Failure.',
        description: error.response.data.message
          ? error.response.data.message
          : 'Account Creation Failure.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return { signUpMutation, isLoading };
}

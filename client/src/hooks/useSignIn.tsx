import useCoursesStore from 'ZustandStore/store';
import api from '../api/api';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import jwt_decode from 'jwt-decode';

async function signIn(email: string, password: string): Promise<LoginResponse> {
  const { data } = await api.post(
    'auth/signin',
    { email, password },
    { timeout: 4000 }
  );

  return data;
}

interface LoginResponse {
  access_token: string;
}

export function useSignIn() {
  const { setToken, setCurrentUser } = useCoursesStore((state) => state);
  const toast = useToast();

  const navigate = useNavigate();
  const { mutate: signInMutation, isLoading } = useMutation<
    LoginResponse,
    unknown,
    { email: string; password: string },
    unknown
  >(({ email, password }) => signIn(email, password), {
    onSuccess: (data) => {
      if (data.access_token) {
        setToken(data.access_token);
        const user: User = jwt_decode(data.access_token);
        setCurrentUser(user);
        toast({
          title: `Welcome ${user.username}.`,
          description: 'Login Successful',
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
          : 'Error on sign in. Try again!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return { signInMutation, isLoading };
}

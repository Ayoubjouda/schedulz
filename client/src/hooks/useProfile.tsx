import useCoursesStore from 'ZustandStore/store';
import api from '../api/api';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import jwt_decode from 'jwt-decode';

async function updateProfile(
  formData: FormData,
  access_token: string
): Promise<any> {
  const { data } = await api.post('user/editprofile', formData, {
    headers: {
      authorization: `Bearer ${access_token}`,
      ContentType: 'multipart/form-data',
    },
  });

  return data;
}

interface LoginResponse {
  access_token: string;
}

export function useProfile() {
  const { setToken, setCurrentUser, access_token } = useCoursesStore(
    (state) => state
  );
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate: profileMutation, isLoading } = useMutation<
    any,
    unknown,
    { formdata: FormData },
    unknown
  >(({ formdata }) => updateProfile(formdata, access_token), {
    onSuccess: (data) => {
      if (data.access_token) {
        setToken(data.statusCode === 201);
        const user: User = jwt_decode(data.access_token);
        setCurrentUser(user);
        toast({
          title: `Profile Editted Successfuly`,
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });
        // navigate("/dashboard/admin");
      }
    },

    onError: (error: any) => {
      toast({
        title: `Error Editing Profile`,
        status: 'error',
        description: error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message,
        position: 'top-right',
        isClosable: true,
      });
    },
  });

  return { profileMutation, isLoading };
}

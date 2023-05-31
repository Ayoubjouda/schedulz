import { useMutation } from "react-query";
import api from "api/api";

export const useLogin = () => {
  const { data, isLoading, isError, error, isSuccess } = useMutation("Login", {
    mutationFn: async (credentials: any) => {
      const { data } = await api.post("auth/signin", { credentials }, { timeout: 4000 });

      return data;
    },
  });
  return { data, isLoading, isError, error, isSuccess };
};

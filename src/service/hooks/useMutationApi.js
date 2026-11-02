import { useMutation, useQueryClient } from "@tanstack/react-query";
import { POST, PUT, DELETE } from "../../service/apiService";

const useMutationApi = (method, endpoint, queryKey = null) => {
  const queryClient = useQueryClient();

  const apiMethods = {
    POST,
    PUT,
    DELETE,
  };

  return useMutation({
    mutationFn: (payload) => apiMethods[method](endpoint, payload),

    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};

export default useMutationApi;
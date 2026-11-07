import { useQuery } from "@tanstack/react-query";
import { GET } from "../apiService";

const useGet = (queryKey, endpoint, options = {}) => {
  return useQuery({
    queryKey,
    queryFn: () => GET(endpoint),
    ...options,
  });
};

export default useGet;
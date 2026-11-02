import { useQuery } from "@tanstack/react-query";
import { GET } from "../apiService";

const useGet = (queryKey, endpoint) => {
  return useQuery({
    queryKey,
    queryFn: () => GET(endpoint),
  });
};

export default useGet;
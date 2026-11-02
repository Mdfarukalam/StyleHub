import { useIsMutating, useIsFetching } from "@tanstack/react-query";

const useGlobalLoader = () => {
  const isMutating = useIsMutating();
  const isFetching = useIsFetching();

  return {
    isLoading: isMutating > 0 || isFetching > 0,
    isMutating: isMutating > 0,
    isFetching: isFetching > 0,
  };
};

export default useGlobalLoader;
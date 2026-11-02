import useGlobalLoader from "../service/hooks/useGlobalLoader";

const GlobalLoader = () => {
  const { isLoading } = useGlobalLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-pink-500" />
    </div>
  );
};

export default GlobalLoader;
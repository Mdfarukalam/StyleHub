import React, { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

const NetworkStatusModal = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#2a2e36] bg-[#181b21] p-7 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <WifiOff size={32} className="text-red-500" />
        </div>

        <h2 className="text-xl font-semibold text-white">
          No Internet Connection
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Please check your internet connection. This website will be available
          again when your connection is restored.
        </p>

        <div className="mt-5 animate-pulse text-sm text-yellow-400">
          Waiting for connection...
        </div>
      </div>
    </div>
  );
};

export default NetworkStatusModal;
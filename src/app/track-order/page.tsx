"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/navigation";
import TrackOrders from "@/components/Sections/TrackOrders";

const TrackOrderPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!session?.user) {
    router.push("/signin");
    return null;
  }

  return (
    <>
      <Navigation />
      <div className="text-white min-h-screen p-4 sm:p-6 md:p-10 lg:p-16 flex flex-col w-full">
        <div className="max-w-7xl mx-auto w-full flex-grow">
          
          <div className="absolute w-[80vw] h-[40vw] rounded-full bg-lime-600/10 blur-3xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-1 pointer-events-none"></div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            <div className="p-4 sm:p-6 w-full relative border border-gray-700 rounded-sm">
              <TrackOrders user={session.user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrderPage;
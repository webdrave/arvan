"use client";
import ProfilePage from "@/components/Sections/UserProfile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status !== "loading" && !session?.user) {
        router.push("/signin");
    }

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* <ProfilePage user={session?.user} /> */}
            <ProfilePage />
        </>
    );
};

export default Page;

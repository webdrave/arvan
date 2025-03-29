"use client";
import Navigation from "@/components/navigation";
import OrderDetails from "@/components/OrderDetails";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams();
  if (!id) {
    return <div>Invalid Order ID</div>;
  }
  if (typeof id !== "string") {
    return <div>Invalid Order ID</div>;
  }
  return <div>
    <Navigation />
    <OrderDetails orderId={id} />
  </div>;
};

export default Page;

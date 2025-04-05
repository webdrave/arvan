"use client";
import Loader from "@/components/Loader";
import React, { useLayoutEffect } from "react";

const loading = () => {
  const [pageLoaded, setPageLoaded] = React.useState(false);

  useLayoutEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
    }, 1000);
  }, []);
  return !pageLoaded && <Loader />;
};

export default loading;

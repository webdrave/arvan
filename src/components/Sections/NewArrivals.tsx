"use server";

import { analyticApi } from "@/lib/api/analytic";
import NewArrivalClient from "../NewArrival";

const NewArrival = async () => {
  const response = await analyticApi.getNewArrivals();

  return <NewArrivalClient slides={response} />;
};

export default NewArrival;

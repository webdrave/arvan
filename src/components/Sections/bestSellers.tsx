"use server";

import { analyticApi } from "@/lib/api/analytic";
import BestSellers from "../BestSeller";

const BestSeller = async () => {
  const response = await analyticApi.getBestSellers();

  return <BestSellers slides={response} />;
};

export default BestSeller;

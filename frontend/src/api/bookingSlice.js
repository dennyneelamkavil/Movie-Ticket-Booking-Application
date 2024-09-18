import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  refetchOnMountOrArgChange: 30,
  baseQuery: baseQuery("bookings"),
  endpoints: (builder) => ({
    makePayment: builder.mutation({
      query: (data) => ({
        url: "/payment/create-checkout-session",
        method: "POST",
        body: data,
      }),
    })    
  }),
});

export const {
  useMakePaymentMutation
} = bookingApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery("users"),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/loginuser",
        method: "POST",
        body: credentials,
      }),
    }),
    signup : builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    })
  }),
});

export const { useLoginMutation, useSignupMutation } = userApi;

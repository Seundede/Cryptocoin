import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  "x-rapidapi-host": "coingecko.p.rapidapi.com",
  "x-rapidapi-key": process.env.REACT_APP_API_KEY1, 
};
 
const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3",
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: ({count}) =>
        createRequest(
          `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&limit=${count}`
        ),
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coins/${coinId}`),
    }),
    getCryptoGlobal: builder.query({
      query: () => createRequest(`/global`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(
          `/coins/${coinId}/market_chart?vs_currency=usd&days=${timePeriod}`
        ),
    }),
    getCryptoExchange: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
}); 

export const { useGetCryptosQuery,useGetCryptoGlobalQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetCryptoExchangeQuery } = apiSlice;
 
/**     `/coins?limit=${count}`*/
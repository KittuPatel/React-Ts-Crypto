import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


interface Stats {
  status: string,
  data: {
      totalCoins: number,
      totalMarkets: number,
      totalExchanges: number,
      totalMarketCap: number,
      total24hVolume: number
  }
}

interface CryptoCoins {
  status: string,
  data: {
    coins: [
      {
        id: number,
        rank:number,
        name: string,
        iconUrl: string,
        price:number,
        marketCap:number,
        change:number,
      },
    ]
  }
}

const cryptoHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': process.env.REACT_APP_API_KEY
}

const baseUrl = "https://coinranking1.p.rapidapi.com"

const createRequest = (url: string) => ({ 
  url,
  headers: cryptoHeaders
})


export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoStats: builder.query<Stats, void>({
      query: () => createRequest('/stats')
    }),
    getCryptoCoins: builder.query<CryptoCoins, number>({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`)
    }),
    getCryptoHistory: builder.query({
      query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history/${timePeriod}`)
    }),
    getCryptoExchanges: builder.query({
      query: (url) => createRequest(`/${url}`)
    }),
  })
})

export const { useGetCryptoStatsQuery, useGetCryptoCoinsQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetCryptoExchangesQuery } = cryptoApi;
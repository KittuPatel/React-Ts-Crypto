import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': 'f69b0843f3msha352287fa4b7ce7p1f60dcjsnd3bc5a6534ad'
}

const baseUrl = "https://coinranking1.p.rapidapi.com"

const createRequest = (url: string) => ({ 
  url,
  headers: cryptoHeaders
})

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

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoStats: builder.query<Stats, void>({
      query: () => createRequest('/stats')
    })
  })
})

export const { useGetCryptoStatsQuery } = cryptoApi;
//METODO PIù SEMPLICE UTILIZZANDO - RTK QUERY
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Definizione del slice API con RTK Query
export const apiSlice = createApi({
  reducerPath: 'api',  // Nome del reducer
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }), // Base URL per le API
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',  // Endpoint dell'API
    }),
    getPostById: builder.query({
      query: (postID) => `/posts/${postID}`,  // Endpoint per ottenere un singolo post
    }),
  }),
});

// Esporta l'hook generato automaticamente da RTK Query
export const { useGetPostsQuery, useGetPostByIdQuery  } = apiSlice;
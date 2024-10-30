import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Definizione dell'API per le transazioni
export const apiTransactions = createApi({
  reducerPath: "apiTransactions",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7226/api/" }), // Modifica l'URL del backend
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "TransactionsApi/GetAllTransactions", // Endpoint per ottenere tutte le transazioni
    }),
    getTransactionById: builder.query({
      query: (transactionID) => `TransactionsApi/GetTransaction/${transactionID}`, // Endpoint per ottenere una transazione per ID
    }),

    //aggiungere una nuova transazione
    addTransaction: builder.mutation({
      query: (newTransaction) => ({
        url: "TransactionsApi/PostTransaction",
        method: "POST",
        body: newTransaction,
      }),
    }),

    //aggiornare transazione esistente
    updateTransaction: builder.mutation({
      query: ({ transactionID, updatedTransaction }) => ({
        url: `TransactionsApi/PutTransaction/${transactionID}`,
        method: "PUT",
        body: updatedTransaction,
      }),
    }),

    //Eliminare transazione esistente
    deleteTransaction: builder.mutation({
      query: (transactionID) => ({
        url: `TransactionsApi/DeleteTransaction/${transactionID}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Esporta gli hook generati automaticamente da RTK Query
export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = apiTransactions;

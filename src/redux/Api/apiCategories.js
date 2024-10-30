import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Definizione del slice API con RTK Query
export const apiCategories = createApi({
  reducerPath: "apiCategories",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7226/api/" }), // Modifica questa URL come necessario
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "CategoriesApi/GetAllCategories", // Endpoint per ottenere le categorie
    }),
    // Ottenere una categoria per ID
    getCategoryById: builder.query({
      query: (categoryID) => `CategoriesApi/GetCategory/${categoryID}`, // Endpoint per ottenere una categoria per ID
    }),

    // Aggiungere una nuova categoria
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: "CategoriesApi/PostCategory", // Endpoint per aggiungere una nuova categoria
        method: "POST",
        body: newCategory,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // Aggiornare una categoria esistente
    updateCategory: builder.mutation({
      query: ({ categoryID, updatedCategory }) => ({
        url: `CategoriesApi/PutCategory/${categoryID}`, // Endpoint per aggiornare una categoria esistente
        method: "PUT",
        body: updatedCategory,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // Eliminare una categoria esistente
    deleteCategory: builder.mutation({
      query: (categoryID) => ({
        url: `CategoriesApi/DeleteCategory/${categoryID}`, // Endpoint per eliminare una categoria
        method: "DELETE",
      }),
      invalidatesTags: ['Category'], // Invalida il tag 'Category' dopo la cancellazione
    }),
  }),
});

// Esporta l'hook generato automaticamente da RTK Query
export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = apiCategories;

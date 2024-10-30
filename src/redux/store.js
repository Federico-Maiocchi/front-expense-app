import { configureStore } from "@reduxjs/toolkit";
import { apiCategories } from "./Api/apiCategories";
import { apiTransactions } from "./Api/apiTransactions";
// import { apiSlice } from "./Api/apiProva";
//importeremo lo store dentro al main.jsx

export default configureStore({
  reducer: {
    [apiCategories.reducerPath]: apiCategories.reducer, // Aggiungo il reducer delle categorie
    [apiTransactions.reducerPath]: apiTransactions.reducer, // Aggiungo il reducer delle transazioni
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(apiCategories.middleware) // Aggiungi il middleware categorie
  .concat(apiTransactions.middleware), // Aggiungi il middleware transazioni
});

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
//importiamo il Prop - dal nostro store.js
import store from "./redux/store.js";
//importiamo il nostro provider
import { Provider } from "react-redux";
//importiamo il roputer dom per la creazione della lista rotte
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//category 
import Categories from "./pages/Category/Categories.jsx";
import Category from "./pages/Category/Category.jsx";
import CategoryCreate from "./pages/Category/CategoryCreate.jsx";
import CategoryEdit from "./pages/Category/CategoryEdit.jsx";
import CategoryDelete from "./pages/Category/CategoryDelete.jsx";
import CategoriesExpense from "./pages/Category/CategoriesExpense.jsx";
import CategoriesIncome from "./pages/Category/CategoriesIncome.jsx";
//transaction
import Transactions from "./pages/Transaction/Transactions.jsx";
import Transaction from "./pages/Transaction/Transaction.jsx";
import TransactionCreate from "./pages/Transaction/TransactionCreate.jsx";
import TransactionEdit from "./pages/Transaction/TransactionEdit.jsx";
import TransactionDelete from "./pages/Transaction/TransactionDelete.jsx"
import TransactionsExpense from "./pages/Transaction/TransactionsExpense.jsx";
import TransactionsIncome from "./pages/Transaction/TransactionsIncome.jsx";
import HomePage from "./pages/HomePage.jsx";

//Router list
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App gestisce il layout
    children: [
      //homepage
      {
        path: "/",
        element: <HomePage/>
      },
      //categories
      {
        path: "categories",
        element: <Categories />, // lista con tutte le categorie
      },
      {
        path: "categories/expense",
        element: <CategoriesExpense />, // lista delle categorie con type expense
      },
      {
        path: "categories/income",
        element: <CategoriesIncome />, // lista delle categorie con type income
      },
      {
        path: "/Categories/:categoryID", 
        element: <Category></Category>, // categoria tramite ID
      },
      {
        path: "/Categories/create",
        element: <CategoryCreate></CategoryCreate>, // creazione di una categoria
      },
      {
        path: "/Categories/edit/:categoryID",
        element: <CategoryEdit></CategoryEdit>, // modifica di una categoria esistente
      },
      {
        path: "/Categories/delete/:categoryID",
        element: <CategoryDelete></CategoryDelete>, // eliminazione di una categoria esistente
      },
      //transactions
      {
        path: "transactions",
        element: <Transactions />, // lista di tutte transazioni
      },
      {
        path: "transactions/expense",
        element: <TransactionsExpense />, // lista delle transizioni con categoria di tipo expense
      },
      {
        path: "transactions/income",
        element: <TransactionsIncome />, // lista delle transizioni con categoria di tipo income
      },
      {
        path: "transactions/:transactionID", 
        element: <Transaction/>, // transazione tramite ID
      },
      {
        path: "/transactions/create",
        element: <TransactionCreate></TransactionCreate>, // creazione transazione
      },
      {
        path: "/transactions/edit/:transactionID",
        element: <TransactionEdit></TransactionEdit>, // modifica transazione esistente
      },
      {
        path: "/transactions/delete/:transactionID",
        element: <TransactionDelete/>, // eliminazione transazione esistente
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

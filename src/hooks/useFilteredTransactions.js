import { useState, useMemo } from "react";

const useFilteredTransactions = (transactions = []) => {
  const [sortOrder, setSortOrder] = useState(null);
  const [dateSortOrder, setDateSortOrder] = useState("dateDesc");
  const [titleSearch, setTitleSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [importMin, setImportMin] = useState(null);
  const [importMax, setImportMax] = useState(null);

  const resetFilters = () => {
    setSortOrder(null);
    setDateSortOrder("dateDesc");
    setTitleSearch("");
    setTypeFilter("");
    setDateFrom(null);
    setDateTo(null);
    setImportMin(null);
    setImportMax(null);
  };

  // Funzione per impostare l'ordinamento per titolo e resettare l'ordinamento per data
  const handleSetSortOrder = (order) => {
    setSortOrder(order);
    setDateSortOrder(null); // Resetta l'ordinamento per data
  };

  // Funzione per impostare l'ordinamento per data e resettare l'ordinamento per titolo
  const handleSetDateSortOrder = (order) => {
    setDateSortOrder(order);
    setSortOrder(null); // Resetta l'ordinamento per titolo
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        if (
          titleSearch &&
          !transaction.category.title
            .toLowerCase()
            .includes(titleSearch.toLowerCase())
        ) {
          return false;
        }

        if (typeFilter && transaction.category.type !== typeFilter) {
          return false;
        }

        const transactionDate = new Date(transaction.date).setHours(0, 0, 0, 0);
        const fromDate = dateFrom
          ? new Date(dateFrom).setHours(0, 0, 0, 0)
          : null;
        const toDate = dateTo
          ? new Date(dateTo).setHours(23, 59, 59, 999)
          : null;

        if (fromDate && transactionDate < fromDate) {
          return false;
        }

        if (toDate && transactionDate > toDate) {
          return false;
        }

        // Filtro per importo con intervallo esteso fino al massimo decimale incluso
        const transactionAmount = parseFloat(transaction.amount);
        if (importMin !== null && transactionAmount < importMin) {
          return false;
        }
        if (
          importMax !== null &&
          transactionAmount > parseFloat(importMax) + 0.01
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.category.title.localeCompare(b.category.title);
        }
        if (sortOrder === "desc") {
          return b.category.title.localeCompare(a.category.title);
        }

        if (dateSortOrder === "dateAsc") {
          return new Date(a.date) - new Date(b.date);
        }
        if (dateSortOrder === "dateDesc") {
          return new Date(b.date) - new Date(a.date);
        }

        return 0;
      });
  }, [
    transactions,
    titleSearch,
    typeFilter,
    dateFrom,
    dateTo,
    importMin,
    importMax,
    sortOrder,
    dateSortOrder,
  ]);

  return {
    filteredTransactions,
    sortOrder,
    dateSortOrder,
    titleSearch,
    typeFilter,
    dateFrom,
    dateTo,
    importMin,
    importMax,
    setSortOrder: handleSetSortOrder,
    setDateSortOrder: handleSetDateSortOrder,
    setTitleSearch,
    setTypeFilter,
    setDateFrom,
    setDateTo,
    setImportMin,
    setImportMax,
    resetFilters,
  };
};

export default useFilteredTransactions;

import { useState, useMemo } from "react";

const useFilteredCategories = (categories = []) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState(""); // Aggiunta la gestione di searchTerm
  const [typeFilter, setTypeFilter] = useState("all");

  //reset dei filtri
  const resetFilter = () => {
    setSortOrder("asc");
    setSearchTerm("");
    setTypeFilter("all");
  };

  // Usa useMemo per ottimizzare le performance ed evitare di ricalcolare ad ogni render
  const filteredCategories = useMemo(() => {
    return categories
      .filter((category) => {
        // Filtra in base al tipo selezionato ("all", "Expense" o "Income")
        if (typeFilter === "all") return true;
        return category.type === typeFilter;
      })
      .filter((category) =>
        category.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [categories, searchTerm, typeFilter]);

  const sortedCategories = useMemo(() => {
    return [...filteredCategories].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }, [filteredCategories, sortOrder]);

  return {
    sortOrder,
    setSortOrder,
    searchTerm,
    setSearchTerm,
    sortedCategories,
    typeFilter,
    setTypeFilter,
    resetFilter,
  };
};

export default useFilteredCategories;

import { useGetCategoriesQuery } from "../../redux/Api/apiCategories";
import useFilteredCategories from "../../hooks/useFilteredCategories";
import CardCategoryItem from "../../components/Card/CardCategoryItem";
import Pagination from "../../components/Pagination/Pagination";
import Filter from "../../components/Filter/Filter";
import { useState, useEffect } from "react";
import "../../sass/pages-style/pages.scss";

function CategoriesExpense() {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useGetCategoriesQuery();

  const expenseCategories = categories?.filter(
    (category) => category.type == "Expense"
  );

  //filtri
  // Usa il custom hook per la logica di filtro e ordinamento
  const {
    sortOrder,
    setSortOrder,
    searchTerm,
    setSearchTerm,
    sortedCategories,
    typeFilter, // Aggiungi typeFilter
    setTypeFilter, // Aggiungi setTypeFilter
    resetFilter,
  } = useFilteredCategories(expenseCategories || []);

  //visibilità filtri apertura chiusura
  const [filtersVIsible, setFiltersVisible] = useState(false);

  useEffect(() => {
    // Forza il refetch dei dati quando il componente viene montato
    refetch();
  }, [refetch]);

  // Impaginazione
  const itemsPerPage = 9; // Numero di categorie per pagina
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);

  // Calcola gli indici degli elementi da mostrare
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const categoriesToShow = sortedCategories.slice(startIndex, endIndex);

  if (isLoading) return <p>Caricamento in corso...</p>;
  if (error) return <p>Errore durante il caricamento delle categorie.</p>;

  return (
    <>
      <div className="page-head flex items-center gap-10">
        <h1>Categorie spese</h1>
        {/* Pulsante per mostrare/nascondere i filtri */}
        <button
          onClick={() => setFiltersVisible(!filtersVIsible)}
          className="button-toggle-filters"
        >
          {filtersVIsible ? "Nascondi Filtri" : "Mostra Filtri"}
        </button>
      </div>

      {/* sezione filtiri */}
      <div>
        {filtersVIsible && (
          <Filter
            sortOrder={sortOrder}
            onSortChange={(e) => setSortOrder(e.target.value)}
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            typeFilter={typeFilter} // Passa typeFilter al componente Filter
            onTypeChange={(e) => setTypeFilter(e.target.value)} // Passa la funzione per aggiornare typeFilter
            resetFilter={resetFilter}
          />
        )}
      </div>

      <div>
        <div className="grid grid-rows-3 grid-cols-3 gap-4">
          {categoriesToShow.map((category) => (
            <CardCategoryItem
              key={category.categoryId}
              categoryID={category.categoryId}
              title={category.title}
              icon={category.icon}
              type={category.type}
            />
          ))}
        </div>
      </div>

      {/* impaginazione */}
      {/* Utilizza il componente di impaginazione */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default CategoriesExpense;

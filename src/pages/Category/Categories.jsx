import CardCategoryItem from "../../components/Card/CardCategoryItem";
import { useGetCategoriesQuery } from "../../redux/Api/apiCategories";
import { Link } from "react-router-dom";
import "../../sass/pages-style/pages.scss";
import { useState } from "react";
import useFilteredCategories from "../../hooks/useFilteredCategories";
import Filter from "../../components/Filter/Filter";
import Pagination from "../../components/Pagination/Pagination";

function Categories() {
  const {
    data: categories = [],
    error,
    isLoading,
  } = useGetCategoriesQuery(null, {
    refetchOnMountOrArgChange: true, // Forza il refetch ogni volta che la pagina viene montata
  });
  // console.log(categories);

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
    resetFilter
  } = useFilteredCategories(categories);

  //visibilità filtri apertura chiusura
  const [filtersVIsible, setFiltersVisible] = useState(false);

  // Impaginazione
  const itemsPerPage = 9; // Numero di categorie per pagina
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);

  // Calcola gli indici degli elementi da mostrare
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const categoriesToShow = sortedCategories.slice(startIndex, endIndex);

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (error) return <div>Errore durante il caricamento dei dati.</div>;

  return (
    <>
      <div className="page-head flex items-center gap-10">
        {/* titolo pagina */}
        <h1>Tutte le categorie</h1>
        {/* Pulsante rotta category/create */}
        <Link to={`/categories/create`}>
          <button className="button-create">Nuova Categoria</button>
        </Link>
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

      {/* card category */}
      <div className="page-body">
        <div className="grid grid-rows-3 grid-cols-3 gap-8">
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

export default Categories;

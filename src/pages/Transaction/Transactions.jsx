//import CardTransactionItem from "../components/Card/CardTransactionItem";
import TableTransactions from "../../components/Table/TableTransactions";
import { useGetTransactionsQuery } from "../../redux/Api/apiTransactions";
import { Link } from "react-router-dom";
import useFilteredTransactions from "../../hooks/useFilteredTransactions";
import FilterTransactions from "../../components/Filter/FIlterTransactions";
import { useState } from "react";

function Transactions() {
  const {
    data: transactions,
    error,
    isLoading,
  } = useGetTransactionsQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const {
    filteredTransactions,
    sortOrder,
    dateSortOrder,
    titleSearch,
    typeFilter,
    dateFrom,
    dateTo,
    importMin,
    importMax,
    setSortOrder,
    setDateSortOrder,
    setTitleSearch,
    setTypeFilter,
    setDateFrom,
    setDateTo,
    setImportMin,
    setImportMax,
    resetFilters,
  } = useFilteredTransactions(transactions || []);

  // Visibilità dei filtri
  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <>
      {isLoading ? (
        <div>Caricamento in corso...</div>
      ) : error ? (
        <div>Errore durante il caricamento dei dati.</div>
      ) : (
        <div>
          <div className="page-head flex items-center gap-10">
            {/* titolo pagina */}
            <h1>Transazioni</h1>
            {/* pulsante rotta transation/create */}
            <Link to={`/transactions/create`}>
              <button className="button-create">Nuova Transazione</button>
            </Link>
            {/* Pulsante per mostrare/nascondere i filtri */}
            <button
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="button-toggle-filters"
            >
              {filtersVisible ? "Nascondi Filtri" : "Mostra Filtri"}
            </button>
          </div>

          {/* sezione filtri */}
          <div>
            {filtersVisible && (
              <FilterTransactions
                sortOrder={sortOrder}
                dateSortOrder={dateSortOrder}
                titleSearch={titleSearch}
                typeFilter={typeFilter}
                dateFrom={dateFrom}
                dateTo={dateTo}
                importMin={importMin}
                importMax={importMax}
                setSortOrder={setSortOrder}
                setDateSortOrder={setDateSortOrder}
                setTitleSearch={setTitleSearch}
                setTypeFilter={setTypeFilter}
                setDateFrom={setDateFrom}
                setDateTo={setDateTo}
                setImportMin={setImportMin}
                setImportMax={setImportMax}
                resetFilters={resetFilters}
              />
            )}
          </div>

          {/* Tabella delle Transazioni */}
          <div style={{ marginTop: "20px" }}>
            <TableTransactions transactions={filteredTransactions} />
          </div>
        </div>
      )}
    </>
  );
}

export default Transactions;

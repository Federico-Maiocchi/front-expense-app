import "../../sass/filter/filter.scss";

function FilterTransactions({
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
  showTypeFilter = true,
}) {
  return (
    <div className="filter-section mb-4 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {/* Filtro Ordinamento */}
        <div>
          <label htmlFor="sortOrder">Ordina per:</label>
          <select
            id="sortOrder"
            value={sortOrder || ""}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Seleziona</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>

        {/* Filtro Ordinamento per Data */}
        <div>
          <label htmlFor="dateSortOrder">Ordina per data:</label>
          <select
            id="dateSortOrder"
            value={dateSortOrder || ""}
            onChange={(e) => setDateSortOrder(e.target.value)}
          >
            <option value="">Seleziona</option>
            <option value="dateAsc">Data Meno Recente</option>
            <option value="dateDesc">Data Più Recente</option>
          </select>
        </div>

        {/* Filtro Ricerca per Titolo */}
        <div>
          <label htmlFor="titleSearch">Cerca per titolo:</label>
          <input
            type="text"
            id="titleSearch"
            value={titleSearch || ""}
            placeholder="Cerca..."
            onChange={(e) => setTitleSearch(e.target.value)}
            className="border rounded p-1"
          />
        </div>

        {/* Filtro per tipo di categoria - mostrato solo se showTypeFilter è true */}
        {showTypeFilter && (
          <div>
            <label htmlFor="typeFilter">Tipo di categoria:</label>
            <select
              id="typeFilter"
              value={typeFilter || ""}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Tutti</option>
              <option value="Expense">Spese</option>
              <option value="Income">Entrate</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <div className="filter-date">
          {/* Filtro per Data da */}
          <div>
            <label htmlFor="dateFrom">Data da:</label>
            <input
              type="date"
              id="dateFrom"
              value={dateFrom || ""}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>

          {/* Filtro per Data a */}
          <div>
            <label htmlFor="dateTo">Data a:</label>
            <input
              type="date"
              id="dateTo"
              value={dateTo || ""}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-amount">
          {/* Filtro per Importo Minimo */}
          <div>
            <label htmlFor="importMin">Importo minimo:</label>
            <input
              type="number"
              id="importMin"
              value={importMin || ""}
              onChange={(e) => setImportMin(parseFloat(e.target.value))}
            />
          </div>

          {/* Filtro per Importo Massimo */}
          <div>
            <label htmlFor="importMax">Importo massimo:</label>
            <input
              type="number"
              id="importMax"
              value={importMax || ""}
              onChange={(e) => setImportMax(parseFloat(e.target.value))}
            />
          </div>
        </div>
        {/* Pulsante per resettare i filtri */}
        <button onClick={resetFilters} className="button-toggle-filters mt-2">
          Reset Filtri
        </button>
      </div>

      {/* Pulsante per resettare i filtri */}
      {/* <button onClick={resetFilters} className="button-toggle-filters mt-2">
        Reset Filtri
      </button> */}
    </div>
  );
}

export default FilterTransactions;

import "../../sass/filter/filter.scss";

function Filter({
  sortOrder,
  onSortChange,
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeChange,
  resetFilter,
}) {
  return (
    <>
      <div className="flex items-center gap-5">
        <div className="filter-section mb-4 flex items-center gap-4">
          {/*filtro Ordinamento alfabetico */}
          <div>
            <label htmlFor="sortOrder">Ordina per:</label>
            <select id="sortOrder" value={sortOrder} onChange={onSortChange}>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
          {/*filtro ricerca testuale */}
          <div>
            <label htmlFor="search">Cerca per titolo:</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Cerca..."
              className="border rounded p-1"
            />
          </div>
          {/*filtro in base al type delle categorie */}
          <div>
            <label htmlFor="typeFilter">Tipo di categoria:</label>
            <select id="typeFilter" value={typeFilter} onChange={onTypeChange}>
              <option value="all">Tutti</option>
              <option value="Expense">Spese</option>
              <option value="Income">Entrate</option>
            </select>
          </div>
          {/* Pulsante per resettare i filtri */}
          <button onClick={resetFilter} className="button-toggle-filters mt-2">
            Reset Filtri
          </button>
        </div>
      </div>
    </>
  );
}

export default Filter;

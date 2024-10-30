import CardTransactionItem from "../../components/Card/CardTransactionItem";
import TableTransactions from "../../components/Table/TableTransactions";
import { useGetTransactionsQuery } from "../../redux/Api/apiTransactions";
import useFilteredTransactions from "../../hooks/useFilteredTransactions";
import FilterTransactions from "../../components/Filter/FIlterTransactions";
import { useState } from "react";

function TransactionsExpense() {
  const { data: transactions, isLoading, error } = useGetTransactionsQuery();
  //   console.log(transactions);

  //transizioni solo con type expense
  const expenseTransactions = transactions?.filter(
    (transaction) => transaction.category.type == "Expense"
  );
  //   console.log(expenseTransactions);

  const {
    filteredTransactions,
    sortOrder,
    dateSortOrder,
    titleSearch,
    //typeFilter,
    dateFrom,
    dateTo,
    importMin,
    importMax,
    setSortOrder,
    setDateSortOrder,
    setTitleSearch,
    //setTypeFilter,
    setDateFrom,
    setDateTo,
    setImportMin,
    setImportMax,
    resetFilters,
  } = useFilteredTransactions(expenseTransactions || []); // Passare solo `expenseTransactions`

  // Visibilità dei filtri
  const [filtersVisible, setFiltersVisible] = useState(false);

  if (isLoading) return <p>Caricamento in corso...</p>;
  if (error) return <p>Errore durante il caricamento delle categorie.</p>;

  return (
    <>
      <div className="page-head flex items-center gap-10">
        <h1>Transazioni in uscita</h1>
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
            //typeFilter={typeFilter}
            dateFrom={dateFrom}
            dateTo={dateTo}
            importMin={importMin}
            importMax={importMax}
            setSortOrder={setSortOrder}
            setDateSortOrder={setDateSortOrder}
            setTitleSearch={setTitleSearch}
            //setTypeFilter={setTypeFilter}
            setDateFrom={setDateFrom}
            setDateTo={setDateTo}
            setImportMin={setImportMin}
            setImportMax={setImportMax}
            resetFilters={resetFilters}
            showTypeFilter={false} // Nasconde il filtro tipo
          />
        )}
      </div>

      <TableTransactions transactions={filteredTransactions} />



      {/* <div>
        <div className="grid grid-rows-3 grid-cols-3 gap-4">
          {expenseTransactions.map((transaction) => (
            <CardTransactionItem
              key={transaction.transactionId}
              transactionID={transaction.transactionId}
              amount={transaction.amountWithSymbol}
              date={transaction.formattedDate}
              note={transaction.note}
              showNote={false}
              titleCategory={transaction.category.titleWithIcon}
              typeCategory={transaction.category.type}
            />
          ))}
        </div>
      </div> */}

      
    </>
  );
}

export default TransactionsExpense;

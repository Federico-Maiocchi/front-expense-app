import React from "react";
import "../../sass/table/tableTransactions.scss";
import { useTable, usePagination } from "react-table";
import DropdownMenu from "../Dropdown/DropdownMenu";
import { Link } from "react-router-dom";

function TableTransactions({ transactions }) {
  const columns = React.useMemo(
    () => [
      //{ Header: "ID", accessor: "transactionId" },
      { Header: "Data", accessor: "formattedDate" },
      { Header: "Categoria", accessor: "category.titleWithIcon" },
      { Header: "Importo", accessor: "amountWithSymbol" },
      {
        Header: "Nota",
        accessor: "note",
        Cell: ({ value }) => (
          <div className="note-cell">
            {value < 1
              ? "nessuna nota"
              : value.length > 120
              ? `${value.substring(0, 120)}...`
              : value}
          </div>
        ),
      },
      {
        Header: "Tipo",
        accessor: "category.type",
        Cell: ({ value }) => (
          <span
            className={`badge ${
              value === "Expense" ? "badge-expense" : "badge-income"
            }`}
          >
            {value === "Expense" ? "Spese" : "Reddito"}
          </span>
        ),
      },
      {
        Header: "Azioni",
        accessor: "actions",
        Cell: ({ row }) => (
          <DropdownMenu>
            <li>
              <Link to={`/transactions/${row.original.transactionId}`}>
                Dettagli
              </Link>
            </li>
            <li>
              <Link to={`/transactions/edit/${row.original.transactionId}`}>
                Modifica
              </Link>
            </li>
            <li>
              <Link to={`/transactions/delete/${row.original.transactionId}`}>
                Elimina
              </Link>
            </li>
          </DropdownMenu>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Array delle righe della pagina attuale
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
    prepareRow,
  } = useTable(
    {
      columns,
      data: transactions,
      initialState: { pageIndex: 0, pageSize: 8 }, // Imposta 10 righe per pagina
    },
    usePagination
  );

  return (
    <div className="table-container">
      {/* table */}
      <table {...getTableProps()}>
        {/* thead */}
        <thead>
          {headerGroups.map((headerGroup, headerIndex) => {
            const { key, ...headerProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={`headerGroup-${headerIndex}`} {...headerProps}>
                {headerGroup.headers.map((column, columnIndex) => {
                  const { key, ...columnProps } = column.getHeaderProps();
                  return (
                    <th key={`header-${columnIndex}`} {...columnProps}>
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        {/* tbody */}
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();
            return (
              <tr key={`row-${rowIndex}`} {...rowProps}>
                {row.cells.map((cell, cellIndex) => {
                  const { key, ...cellProps } = cell.getCellProps();
                  return (
                    <td key={`cell-${rowIndex}-${cellIndex}`} {...cellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Controlli di paginazione */}
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Precedente
        </button>
        <span>
          Pagina{" "}
          <strong>
            {pageIndex + 1} di {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Successivo
        </button>
      </div>
    </div>
  );
}

export default TableTransactions;

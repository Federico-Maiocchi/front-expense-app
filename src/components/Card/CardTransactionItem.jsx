import { Link } from "react-router-dom";
import "../../sass/card/cardTransaction.scss";
import DropdownMenu from "../Dropdown/DropdownMenu";

function CardTransactionItem({
  amount,
  date,
  note,
  titleCategory,
  typeCategory,
  transactionID,
  showNote = false,
}) {
  const typeClass =
    typeCategory === "Expense"
      ? "expense"
      : typeCategory === "Income"
      ? "income"
      : "";

  // Cambia il testo del tipo in base al valore
  const displayType =
    typeCategory === "Expense"
      ? "Spese"
      : typeCategory === "Income"
      ? "Reddito"
      : typeCategory;
  return (
    <div className="cardTransaction cursor-pointer">
      <div className={`cardTransaction-header ${typeClass}`}>
        <div className="flex justify-between items-center">
          <h3 className="cardTransaction-type">{displayType}</h3>
          <DropdownMenu>
            <li>
              <Link to={`/transactions/${transactionID}`}>Dettagli</Link>
            </li>
            <li>
              <Link to={`/transactions/edit/${transactionID}`}>Modifica</Link>
            </li>
            <li>
              <Link to={`/transactions/delete/${transactionID}`}>
                Elimina
              </Link>
            </li>
          </DropdownMenu>
        </div>
      </div>
      <div className="cardTransaction-body">
        <div className="flex flex-col items-center justify-between">
          <div className="flex justify-between items-center">
            <h2 className="cardTransaction-title">{titleCategory}</h2>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <h4>Data:</h4>
                <p className="cardTransaction-date">{date}</p>
              </div>
              <div className="flex items-center gap-3">
                <h4>Importo:</h4>
                <p className="cardTransaction-amount">{amount}</p>
              </div>
            </div>
            {showNote && note && note.length > 0 && (
              <div className="flex  gap-3">
                <h4>Note:</h4>
                <p className="cardTransaction-note">{note}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardTransactionItem;

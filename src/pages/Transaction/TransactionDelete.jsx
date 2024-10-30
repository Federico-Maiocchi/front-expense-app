import { useParams, useNavigate } from "react-router-dom";
import {
  useGetTransactionByIdQuery,
  useDeleteTransactionMutation,
} from "../../redux/Api/apiTransactions";
import { useEffect, useState } from "react";
import CardTransactionItem from "../../components/Card/CardTransactionItem";

function TransactionDelete() {
  const { transactionID } = useParams();
  const navigate = useNavigate();
  const [deleteTransaction, { isLoading: isDeleting, isSuccess, isError }] = useDeleteTransactionMutation();
  const {
    data: transaction,
    isLoading,
    error,
  } = useGetTransactionByIdQuery(transactionID);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setMessage("Transazione eliminata con successo!");
      setTimeout(() => navigate("/transactions"), 1000);
    } else if (isError) {
      setMessage("Si è verificato un errore durante l'eliminazione della transazione.");
    }
  }, [isSuccess, isError, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Sei sicuro di voler eliminare questa transazione?");
    if (confirmDelete) {
      await deleteTransaction(transactionID).unwrap();
    }
  };

  if (error) return <p>Errore durante il caricamento della transazione</p>;
  if (isLoading) return <p>Caricamento in corso...</p>;

  return (
    <>
      <div className="page-header">
        <h1>Sei sicuro di voler eliminare la seguente transazione?</h1>
      </div>
      <div className="flex flex-col">
        <div className="mb-5">
          <CardTransactionItem
            key={transaction.transactionId}
            transactionID={transaction.transactionId}
            amount={transaction.amountWithSymbol} // Usa la proprietà giusta per visualizzare l'importo
            date={transaction.formattedDate} // Usa formattedDate se disponibile
            note={transaction.note}
            showNote={true} // Mostra le note se necessario
            titleCategory={transaction.category.titleWithIcon} // Assicurati che questa proprietà esista
            typeCategory={transaction.category.type} // Assicurati che questa proprietà esista
          />
        </div>
        <div className="flex gap-5">
          <button
            className="button-delete"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Elimina Transazione"}
          </button>
          {message && <p>{message}</p>}
          <button onClick={() => navigate("/transactions")}>Annulla</button>
        </div>
      </div>
    </>
  );
}

export default TransactionDelete;

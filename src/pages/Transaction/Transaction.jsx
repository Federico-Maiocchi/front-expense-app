import { useNavigate, useParams } from "react-router-dom";
import CardTransactionItem from "../../components/Card/CardTransactionItem";
import { useGetTransactionByIdQuery } from "../../redux/Api/apiTransactions";

function Transaction() {
  const { transactionID } = useParams();
  // console.log(transactionID);

  const navigate = useNavigate();

  const {
    data: transaction,
    isLoading,
    error,
  } = useGetTransactionByIdQuery(transactionID);
  // console.log(transaction);

  if (error) return <p>Errore durante il caricamento del post</p>;
  if (isLoading) return <p>Caricamento in corso...</p>;

  return (
    <>
      <h1>Transazione</h1>
      <div>
        <CardTransactionItem
          key={transaction.transactionId}
          transactionID={transaction.transactionId}
          amount={transaction.amountWithSymbol}
          date={transaction.formattedDate}
          note={transaction.note}
          showNote={true}
          titleCategory={transaction.category.titleWithIcon}
          typeCategory={transaction.category.type}
        />
      </div>
      <button onClick={() => navigate("/transactions")}>Indietro</button>
    </>
  );
}

export default Transaction;

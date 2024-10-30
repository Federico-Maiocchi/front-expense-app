// TransactionEdit.js
import { useGetTransactionByIdQuery, useUpdateTransactionMutation } from "../../redux/Api/apiTransactions";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FormTransaction from "../../components/Form/FormTransaction";

function TransactionEdit() {
    const { transactionID } = useParams(); // Ottieni l'ID della transazione dalla URL
    const navigate = useNavigate();
    
    const { data: transaction, isLoading, error } = useGetTransactionByIdQuery(transactionID);
    const [updateTransaction] = useUpdateTransactionMutation();
    
    const [resetForm, setResetForm] = useState(false); // Stato per resettare il modulo

    // Stato iniziale per il form
    const [initialData, setInitialData] = useState({ date: '', categoryId: '', amount: '', note: '' });

    // Imposta i dati iniziali del form quando i dati della transazione cambiano
    useEffect(() => {
        if (transaction) {
            setInitialData({
                date: transaction.date ? transaction.date.substring(0, 10) : "",
                categoryId: transaction.categoryId || "",
                amount: transaction.amount || "",
                note: transaction.note || "",
            });
        }
    }, [transaction]);

    const handleUpdate = async (updatedTransactionData) => {
        try {
            // Struttura il payload in modo esplicito
            const transactionData = {
                transactionID,
                updatedTransaction: {
                    transactionId : parseInt(transactionID, 10),
                    date: new Date(updatedTransactionData.date).toISOString(),
                    categoryId: updatedTransactionData.categoryId,
                    amount: updatedTransactionData.amount,
                    note: updatedTransactionData.note,
                },
            };

            await updateTransaction(transactionData).unwrap();

            setResetForm(true); // Imposta per resettare il modulo
            navigate("/transactions?refetch=true"); // Reindirizza alla lista delle transazioni dopo l'aggiornamento
        } catch (err) {
            console.error("Errore nell'aggiornamento della transazione:", err);
        }
    };

    if (isLoading) return <div>Caricamento della transazione...</div>;
    if (error) return <div>Errore nel caricamento della transazione</div>;

    return (
        <div>
            <h1>Modifica transazione</h1>
            <FormTransaction
                initialData={initialData} // Passa i dati iniziali qui
                onSubmit={handleUpdate}
                reset={resetForm} // Gestisce il reset solo al momento del salvataggio
            />
            {/* <button onClick={() => navigate("/transactions")}>Indietro</button> */}
        </div>
    );
}

export default TransactionEdit;




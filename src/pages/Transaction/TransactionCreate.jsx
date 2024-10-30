import { useNavigate } from "react-router-dom";
import FormTransaction from "../../components/Form/FormTransaction";
import { useAddTransactionMutation } from "../../redux/Api/apiTransactions"; // Assicurati che esista un hook simile per le transazioni
import { useEffect, useState } from "react";

function TransactionCreate() {
    const [createTransaction, { isLoading, error, isSuccess }] = useAddTransactionMutation();
    const navigate = useNavigate();

    // Stato per resettare il modulo
    const [resetForm, setResetForm] = useState(false);

    const handleCreate = async (transactionData) => {
        // console.log("Dati transazione:", transactionData);
        try {
            await createTransaction(transactionData).unwrap(); // Chiamata all'API
            setResetForm(true); // Imposta per resettare il modulo
            navigate("/transactions"); // Reindirizza alla lista delle transazioni dopo la creazione
        } catch (err) {
            console.error("Errore nella creazione della transazione:", err);
        }
    };

    useEffect(() => {
        if (isSuccess && resetForm) {
            setResetForm(false); // Resetta il form
        }
    }, [isSuccess, resetForm]);

    return (
        <div>
            <h1>Crea una nuova transazione</h1>
            {isLoading && <p>Creazione in corso...</p>}
            {error && <p>Errore durante la creazione della transazione: {error.message}</p>}
            <FormTransaction onSubmit={handleCreate} reset={resetForm} />
            {/* <button onClick={() => navigate("/transactions")}>Indietro</button> */}
        </div>
    );
}

export default TransactionCreate;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import FormTransaction from "../components/Form/FormTransaction";
// import { useAddTransactionMutation } from "../redux/Api/apiTransactions";

// function TransactionCreate() {
//   const [addTransaction, { isLoading, error, isSuccess }] = useAddTransactionMutation();
//   const navigate = useNavigate();

//   // Stato per resettare il modulo
//   const [resetForm, setResetForm] = useState(false);

//   const handleCreate = async (transactionData) => {
//     console.log("Dati transazione:", transactionData);
//     try {
//       await addTransaction(transactionData).unwrap(); // Chiamata all'API
//       setResetForm(true); // Imposta per resettare il modulo
//       navigate("/transactions"); // Reindirizza alla lista delle transazioni dopo la creazione
//     } catch (err) {
//       console.error("Errore nella creazione della transazione:", err);
//     }
//   };

//   useEffect(() => {
//     if (isSuccess && resetForm) {
//       setResetForm(false); // Resetta il modulo solo una volta
//     }
//   }, [isSuccess, resetForm]);

//   return (
//     <div>
//       <h1>Crea una nuova transazione</h1>
//       {isLoading && <p>Creazione in corso...</p>}
//       {error && <p>Errore durante la creazione della transazione: {error.message}</p>}
//       <FormTransaction onSubmit={handleCreate} reset={resetForm} />
//     </div>
//   );
// }

// export default TransactionCreate;

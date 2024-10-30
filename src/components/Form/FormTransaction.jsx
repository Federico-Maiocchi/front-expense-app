import { useState, useEffect } from "react";
import { useGetCategoriesQuery } from "../../redux/Api/apiCategories"; // Assicurati che il path sia corretto
import "../../sass/form/formTransaction.scss";
import { useNavigate } from "react-router-dom";

function FormTransaction({ onSubmit, reset, initialData }) {
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  // Recupera le categorie
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !categoryId || !amount) {
      console.error(
        "Dati mancanti: data, categoria o importo non possono essere vuoti."
      );
      return;
    }

    const transactionData = {
      date,
      categoryId,
      amount: parseFloat(amount),
      note,
    };

    onSubmit(transactionData);
  };

  useEffect(() => {
    if (initialData) {
      setDate(initialData.date || "");
      setCategoryId(initialData.categoryId || "");
      setAmount(initialData.amount || "");
      setNote(initialData.note || "");
    }
  }, [initialData]);

  useEffect(() => {
    if (reset) {
      setDate("");
      setCategoryId("");
      setAmount("");
      setNote("");
    }
  }, [reset]);

  if (isLoading) return <div>Caricamento categorie...</div>;
  if (error) return <div>Errore nel caricamento delle categorie</div>;

  return (
    <div className="card-form-transaction">
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label htmlFor="date">Data</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Categoria</label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Seleziona una categoria</option>
            {categories &&
              categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.titleWithIcon}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Importo</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">Nota</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <button type="submit">Salva transazione</button>
          <button className="red" onClick={() => navigate("/transactions")}>
            Indietro
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormTransaction;

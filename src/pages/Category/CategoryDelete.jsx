import { useParams, useNavigate } from "react-router-dom";
import {
  useGetCategoryByIdQuery,
  useDeleteCategoryMutation,
} from "../../redux/Api/apiCategories";
import CardCategoryItem from "../../components/Card/CardCategoryItem";
import { useEffect, useState } from "react";

function CategoryDelete() {
  const { categoryID } = useParams();
  const navigate = useNavigate(); // per reindirizzare dopo la cancellazione
  const [deleteCategory, { isLoading: isDeleting, isSuccess, isError }] =
    useDeleteCategoryMutation();
  const {
    data: category,
    isLoading,
    error,
  } = useGetCategoryByIdQuery(categoryID);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setMessage("Categoria eliminata con successo!");
      setTimeout(() => navigate("/categories"), 1000); // Reindirizza alla lista delle categorie dopo 1 secondi
    } else if (isError) {
      setMessage(
        "Si è verificato un errore durante l'eliminazione della categoria."
      );
    }
  }, [isSuccess, isError, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Sei sicuro di voler eliminare questa categoria?"
    );
    if (confirmDelete) {
      await deleteCategory(categoryID).unwrap(); // Chiama la mutazione di eliminazione
    }
  };

  if (error) return <p>Errore durante il caricamento della categoria</p>;
  if (isLoading) return <p>Caricamento in corso...</p>;

  return (
    <>
      <div className="page-header">
        <h1>Sei sicuro di voler eliminare la seguente categoria?</h1>
      </div>
      <div className="flex flex-col">
        <div className="mb-5">
          <CardCategoryItem
            key={category.categoryId}
            categoryID={category.categoryId}
            title={category.title}
            icon={category.icon}
            type={category.type}
          />
        </div>
        <div className="flex gap-5">
          <button
            className="button-delete"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Elimina Categoria"}
          </button>
          {message && <p>{message}</p>}
          <button onClick={() => navigate("/categories")}>Annulla</button>
        </div>
      </div>
    </>
  );
}

export default CategoryDelete;

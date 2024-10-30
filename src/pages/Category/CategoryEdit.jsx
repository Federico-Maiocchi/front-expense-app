import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "../../redux/Api/apiCategories"; 
import { useState, useEffect } from "react";
import FormCategory from "../../components/Form/FormCategory";

function CategoryEdit() {
  const { categoryID } = useParams(); 
  const navigate = useNavigate();
  
  const {
    data: categoryData,
    isLoading,
    error,
  } = useGetCategoryByIdQuery(categoryID);
  
  const [updateCategory] = useUpdateCategoryMutation(); 
  const [isUpdating, setIsUpdating] = useState(false);
  const [resetForm, setResetForm] = useState(false); 

  const [initialData, setInitialData] = useState({ title: '', icon: '', type: 'Expense' });

  // Imposta i dati iniziali del form quando categoryData cambia
  useEffect(() => {
    if (categoryData) {
      setInitialData({
        title: categoryData.title || "",
        icon: categoryData.icon || "",
        type: categoryData.type || "Expense", 
      });
    }
  }, [categoryData]);

  const handleUpdate = async (updatedCategoryData) => {
    try {
      setIsUpdating(true);
  
      // Struttura il payload in modo esplicito
      const categoryData = {
        CategoryId: parseInt(categoryID, 10), // Converti in numero intero
        Title: updatedCategoryData.title.trim(), // Rimuovi eventuali spazi bianchi
        Icon: updatedCategoryData.icon.trim(),
        Type: updatedCategoryData.type,
      };
  
      console.log("Dati da inviare:", categoryData); // Log per debugging
  
      await updateCategory({ categoryID, updatedCategory: categoryData }).unwrap();
  
      setResetForm(true); // Attiva il reset del modulo dopo un aggiornamento riuscito
      setTimeout(() => {
        setResetForm(false); // Resetta il form immediatamente dopo
        navigate("/categories"); // Reindirizza alla lista delle categorie
      }, 0); // Il timeout è solo per consentire il reset prima di navigare
    } catch (err) {
      console.error("Errore nell'aggiornamento della categoria:", err);
      if (err.status === 400) {
        console.error("Dettagli dell'errore:", err.data);
      }
    } finally {
      setIsUpdating(false);
    }
  };


  if (isLoading) return <div>Caricamento categoria...</div>;
  if (error) return <div>Errore nel caricamento della categoria</div>;
  
  return (
    <div>
      <h1>Modifica categoria</h1>
      <FormCategory
        initialData={initialData} // Passa i dati iniziali qui
        onSubmit={handleUpdate}
        reset={resetForm} // Gestisce il reset solo al momento del salvataggio
      />
      {isUpdating && <p>Aggiornamento in corso...</p>}
      {/* <button onClick={() => navigate("/categories")}>Indietro</button> */}
    </div>
  );
}

export default CategoryEdit;

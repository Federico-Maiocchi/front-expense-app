import { useNavigate } from "react-router-dom";
import FormCategory from "../../components/Form/FormCategory";
import { useAddCategoryMutation } from "../../redux/Api/apiCategories";
import { useEffect, useState } from "react";

function CategoryCreate() {
    const [createCategory, { isLoading, error, isSuccess }] = useAddCategoryMutation();
    const navigate = useNavigate();

    // Stato per resettare il modulo
    const [resetForm, setResetForm] = useState(false);

    

    const handleCreate = async (categoryData) => {
        console.log("Dati categoria:", categoryData);
        try {
            await createCategory(categoryData).unwrap(); // Chiamata all'API
            setResetForm(true); // Imposta per resettare il modulo
            navigate("/categories"); // Reindirizza alla lista delle categorie dopo la creazione
        } catch (err) {
            console.error("Errore nella creazione della categoria:", err);
        }
    };

    useEffect(() => {
        if (isSuccess && resetForm) {
            // Qui puoi resettare il modulo
            setResetForm(false);
        }
    }, [isSuccess, resetForm]);



    return (
        <div>
            <h1>Crea una nuova categoria</h1>
            {isLoading && <p>Creazione in corso...</p>}
            {error && <p>Errore durante la creazione della categoria: {error.message}</p>}
            <FormCategory onSubmit={handleCreate} reset={resetForm} />
            {/* <button onClick={() => navigate("/categories")}>Indietro</button> */}
        </div>
    );
}

export default CategoryCreate;

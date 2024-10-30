import { useState, useEffect } from "react";
import "../../sass/form/formCategory.scss";
import { useNavigate } from "react-router-dom";

function FormCategory({ onSubmit, reset, initialData }) {
  const [title, setTitle] = useState(""); // Stato per il titolo
  const [icon, setIcon] = useState(""); // Stato per l'icona
  const [type, setType] = useState("Expense"); // Stato per il tipo, impostato a "Expense" di default

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validazione
    if (!title || !type) {
      console.error("Dati mancanti: titolo o tipo non possono essere vuoti.");
      return; // Non inviare se ci sono dati mancanti
    }

    const categoryData = {
      title,
      icon,
      type,
    };
    onSubmit(categoryData); // Invoca la funzione di callback con i dati del form
  };

  // Imposta i valori iniziali del form quando `initialData` cambia
  useEffect(() => {
    // console.log("Initial data received: ", initialData);
    if (initialData) {
      setTitle(initialData.title || "");
      setIcon(initialData.icon || "");
      setType(initialData.type || "Expense"); // Usa "Expense" come default se non c'è tipo
    }
  }, [initialData]);

  // Resetta i valori quando `reset` è vero
  useEffect(() => {
    if (reset) {
      setTitle("");
      setIcon("");
      setType("Expense");
    }
  }, [reset]);

  return (
    <div className="">
      <div className=" card-form-category">
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label htmlFor="title">Nome categoria</label>
            <input
              id="title"
              type="text"
              value={title} // Lega il valore dell'input allo stato
              onChange={(e) => setTitle(e.target.value)} // Aggiorna lo stato quando cambia
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="icon">Icona</label>
            <input
              id="icon"
              type="text"
              value={icon} // Lega il valore dell'input allo stato
              onChange={(e) => setIcon(e.target.value)} // Aggiorna lo stato quando cambia
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Tipo</label>
            <select
              id="type"
              value={type} // Assicurati che il valore selezionato sia legato allo stato
              onChange={(e) => setType(e.target.value)} // Aggiorna lo stato quando cambia
              required
            >
              <option value="">Seleziona</option>
              <option value="Income">Reddito</option>
              <option value="Expense">Spesa</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button type="submit">Salva categoria</button>
            <button className="red" onClick={() => navigate("/categories")}>
              Indietro
            </button>
          </div>
        </form>
      </div>
      {/* <div className="icon-right">
        <i className="fa-solid fa-puzzle-piece icon-create"></i>
      </div> */}
    </div>
  );
}

export default FormCategory;

// import { useState } from "react";
// import "../../sass/form/formCategory.scss";

// function FormCategory({ onSubmit }) {
//     const [title, setTitle] = useState(""); // Stato per il titolo
//     const [icon, setIcon] = useState(""); // Stato per l'icona
//     const [type, setType] = useState("Expense"); // Stato per il tipo, impostato a "Expense" di default

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Validazione
//         if (!title || !type) {
//             console.error("Dati mancanti: titolo o tipo non possono essere vuoti.");
//             return; // Non inviare se ci sono dati mancanti
//         }

//         const categoryData = {
//             title,
//             icon,
//             type,
//         };
//         onSubmit(categoryData); // Invoca la funzione di callback con i dati del form
//     };

//     return (
//         <div className="card-form-category">
//             <form onSubmit={handleSubmit} className="category-form">
//                 <div className="form-group">
//                     <label htmlFor="title">Nome categoria</label>
//                     <input
//                         id="title"
//                         type="text"
//                         value={title} // Lega il valore dell'input allo stato
//                         onChange={(e) => setTitle(e.target.value)} // Aggiorna lo stato quando cambia
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="icon">Icona</label>
//                     <input
//                         id="icon"
//                         type="text"
//                         value={icon} // Lega il valore dell'input allo stato
//                         onChange={(e) => setIcon(e.target.value)} // Aggiorna lo stato quando cambia
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="type">Tipo</label>
//                     <select
//                         id="type"
//                         value={type} // Assicurati che il valore selezionato sia legato allo stato
//                         onChange={(e) => setType(e.target.value)} // Aggiorna lo stato quando cambia
//                         required
//                     >
//                         <option value="">Seleziona</option>
//                         <option value="Income">Reddito</option>
//                         <option value="Expense">Spesa</option>
//                     </select>
//                 </div>
//                 <button type="submit">Salva categoria</button>
//             </form>
//         </div>
//     );
// }

// export default FormCategory;

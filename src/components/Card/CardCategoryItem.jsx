import "../../sass/card/cardCategory.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import DropdownMenu from "../Dropdown/DropdownMenu";

function CardCategoryItem({ type, title, icon, categoryID }) {
  // console.log(categoryID);

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Stato per gestire il dropdown

  const typeClass =
    type === "Expense" ? "expense" : type === "Income" ? "income" : "";

  // Cambia il testo del tipo in base al valore
  const displayType =
    type === "Expense" ? "Spese" : type === "Income" ? "Reddito" : type;

  // Funzione per mostrare/nascondere il dropdown
  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  return (
    <div className="cardCategory cursor-pointer">
      <div className={`cardCategory-header ${typeClass}`}>
        <div className="flex justify-between items-center">
          <h3 className="cardCategory-type">{displayType}</h3>
          <div className="cardCategory-action flex gap-1">
            {/* Icona per mostrare il dropdown */}
            <DropdownMenu>
              <li>
                <Link to={`/categories/${categoryID}`}>Dettagli</Link>
              </li>
              <li>
                <Link to={`/categories/edit/${categoryID}`}>Modifica</Link>
              </li>
              <li>
                <Link to={`/categories/delete/${categoryID}`}>
                  <span className="text-red-600">Elimina</span>
                </Link>
              </li>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="cardCategory-body flex justify-between ">
        <div className="flex items-center gap-4">
          <i className="cardCategory-icon">{icon}</i>
          <h2 className="cardCategory-title">{title}</h2>
        </div>
      </div>
    </div>
  );
}

export default CardCategoryItem;

{
  /* <div className="relative">
          
<i
  className="fa-solid fa-circle-info cursor-pointer"
  onClick={toggleDropdown} // Gestisce il click sull'icona
></i> */
}

{
  /* Dropdown delle azioni */
}
{
  /* {isDropdownOpen && (
  <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
    <ul>
      <li>
        <Link to={`/categories/${categoryID}`}>Dettagli</Link>
      </li>
      <li>
        <Link to={`/categories/edit/${categoryID}`}>Modifica</Link>
      </li>
      <li>
        <Link to={`/categories/delete/${categoryID}`}>
          <span className="text-red-600">Elimina</span>
        </Link>
      </li>
    </ul>
  </div>
)}
</div> */
}

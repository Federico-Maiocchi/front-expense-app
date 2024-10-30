// import useToggle from "../hooks/useToggle";
import useToggle from "../hooks/useToggle";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png"
import imgAccount from "../assets/adda.png"

import "../sass/sidebar.scss";

function Sidebar({ isReduced }) {
  // Usa il custom hook per gestire l'apertura/chiusura degli item
  const [openItems, toggleItem] = useToggle();

  // Funzione per gestire il toggle di home
  const handleToggleHome = () => {
    toggleItem("home");
  };

  // Funzione per gestire il toggle di categorie
  const handleToggleCategory = () => {
    toggleItem("item1");
  };

  // Funzione per gestire il toggle di transazioni
  const handleToggleTransaction = () => {
    toggleItem("item2");
  };

  // Funzione per gestire il toggle di Item 3
  const handleToggleItem3 = () => {
    toggleItem("item3");
  };

  return (
    <aside className={`${isReduced ? "reduced" : ""}`}>
      {/* log + NOme app - start */}
      <div className="logo cursor-pointer">
        <div className="flex items-center gap-1">
          <div className="photo-logo">
            <img src={logo} alt="" />
          </div>
          {!isReduced && <p>Expense App</p>}{" "}
          {/* Mostra il testo solo se non è ridotto */}
        </div>
      </div>
      {/* log + NOme app - end */}
      {/* Sezione account, foto più nome utente - start */}
      <div className="account cursor-pointer">
        <div className="flex items-center gap-1">
          <div className="photo-avatar">
            <img src={imgAccount} alt="" />
          </div>
          {!isReduced && <p>Account</p>}{" "}
          {/* Mostra il testo solo se non è ridotto */}
        </div>
      </div>
      {/* Sezione account, foto più nome utente - end */}

      {/* Sezione lista rotte - start */}
      <div className="list-primary">
        {/* Sezione lista principale - start */}
        <ul className="">
          {/* HOME */}
          {/* Item 1 con sub-items */}
          <li className={`list-item ${openItems["home"] ? "active" : ""}`}>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={handleToggleHome}
            >
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-house"></i>
                {!isReduced && <p>Home</p>}{" "}
                {/* Mostra il testo solo se non è ridotto */}
              </div>
              <div>
                {/* Cambia l'icona in base allo stato openItems["item1"] */}
                {!isReduced && (
                  <i
                    className={`fa-solid ${
                      openItems["home"] ? "fa-angle-down" : "fa-angle-left"
                    }`}
                  ></i>
                )}
              </div>
            </div>
            {/* Sezione lista secondaria - start */}
            {/* Sub-items di Item 1 */}
            {openItems["home"] && (
              <ul>
                <li className="list-second-item cursor-pointer">
                  <Link to={`/`}>
                    <div className="flex items-center gap-2">
                      <i className="fa-regular fa-circle"></i>
                      {!isReduced && <p>Home</p>}{" "}
                      {/* Mostra il testo solo se non è ridotto */}
                    </div>
                  </Link>
                </li>
              </ul>
            )}
            {/* Sezione lista secondaria - end */}
          </li>

          {/* CATEGORIE */}
          {/* Item 1 con sub-items */}
          <li className={`list-item ${openItems["item1"] ? "active" : ""}`}>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={handleToggleCategory}
            >
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-icons"></i>
                {!isReduced && <p>Categorie</p>}{" "}
                {/* Mostra il testo solo se non è ridotto */}
              </div>
              <div>
                {/* Cambia l'icona in base allo stato openItems["item1"] */}
                {!isReduced && (
                  <i
                    className={`fa-solid ${
                      openItems["item1"] ? "fa-angle-down" : "fa-angle-left"
                    }`}
                  ></i>
                )}
              </div>
            </div>
            {/* Sezione lista secondaria - start */}
            {/* Sub-items di Item 1 */}
            {openItems["item1"] && (
              <ul>
                <li className="list-second-item cursor-pointer">
                  <Link to={`/categories`}>
                    <div className="flex items-center gap-2">
                      <i className="fa-regular fa-circle"></i>
                      {!isReduced && <p>Tutte Le Categorie</p>}{" "}
                      {/* Mostra il testo solo se non è ridotto */}
                    </div>
                  </Link>
                </li>
                <li className="list-second-item cursor-pointer">
                  <Link to={`/categories/expense`}>
                    <div className="flex items-center gap-2">
                      <i className="fa-regular fa-circle"></i>
                      {!isReduced && <p>Categorie Spese</p>}{" "}
                      {/* Mostra il testo solo se non è ridotto */}
                    </div>
                  </Link>
                </li>
                <li className="list-second-item cursor-pointer">
                  <Link to={`/categories/income`}>
                    <div className="flex items-center gap-2">
                      <i className="fa-regular fa-circle"></i>
                      {!isReduced && <p>Categorie Reddito</p>}{" "}
                      {/* Mostra il testo solo se non è ridotto */}
                    </div>
                  </Link>
                </li>
              </ul>
            )}
            {/* Sezione lista secondaria - end */}
          </li>

          {/* TRANSAZIONI */}
          <li className={`list-item ${openItems["item2"] ? "active" : ""}`}>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={handleToggleTransaction}
            >
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-money-bill-transfer"></i>
                {!isReduced && <p>Transazioni</p>}{" "}
                {/* Mostra il testo solo se non è ridotto */}
              </div>
              <div>
                {/* Cambia l'icona in base allo stato openItems["item1"] */}
                {!isReduced && (
                  <i
                    className={`fa-solid ${
                      openItems["item2"] ? "fa-angle-down" : "fa-angle-left"
                    }`}
                  ></i>
                )}
              </div>
            </div>
            {/* Sezione lista secondaria - start */}
            {/* Sub-items di Item 1 */}
            {openItems["item2"] && (
              <ul>
                <li className="list-second-item cursor-pointer">
                  <Link to={`/transactions`}>
                    <div className="flex items-center gap-2">
                      <i className="fa-regular fa-circle"></i>
                      {!isReduced && <p>Tutte Le Transazioni</p>}{" "}
                      {/* Mostra il testo solo se non è ridotto */}
                    </div>
                  </Link>
                </li>
                <li className="list-second-item cursor-pointer">
                  <Link to={`/transactions/expense`}>
                    <div className="flex items-center gap-2">
                      <i className="fa-regular fa-circle"></i>
                      {!isReduced && <p>Transazioni in Uscita</p>}{" "}
                      {/* Mostra il testo solo se non è ridotto */}
                    </div>
                  </Link>
                </li>
                <li className="list-second-item cursor-pointer">
                  <Link to={`/transactions/income`}>
                    <div className="flex items-center gap-2">
                      <i className="fa-regular fa-circle"></i>
                      {!isReduced && <p>Transazioni in Entrata</p>}{" "}
                      {/* Mostra il testo solo se non è ridotto */}
                    </div>
                  </Link>
                </li>
              </ul>
            )}
            {/* Sezione lista secondaria - end */}
          </li>
          {/* Sezione lista principale - end */}
        </ul>
      </div>
      {/* Sezione lista rotte - end */}
    </aside>
  );
}

export default Sidebar;

{
  /* Item 2 senza sub-items */
}
{
  /* <li className="list-item">
<p onClick={handleToggleItem2} style={{ cursor: "pointer" }}>
  Item 2
</p> */
}
{
  /* Non ci sono sub-items */
}
// {openItems["item2"] && (
//   <ul>
//     {/* Se desideri, puoi aggiungere sub-items qui */}
//     {/* <li className="list-item">Sub-item 1</li> */}
//   </ul>
// )}
// </li>
{
  /* Item 3 con sub-items */
}
{
  /* <li className="list-item">
<p onClick={handleToggleItem3} style={{ cursor: "pointer" }}>
  Item 3
</p> */
}
{
  /* Sub-items di Item 3 */
}
// {openItems["item3"] && (
//   <ul>
//     <li className="list-second-item">Sub-item 1</li>
{
  /* Puoi aggiungere altri sub-items qui */
}
//   </ul>
// )}
// </li>

{
  /* <li className="list-item">
<p onClick={handleToggleItem3} style={{ cursor: "pointer" }}>
  Item 3
</p> */
}
{
  /* Sub-items di Item 3 */
}
// {openItems["item3"] && (
//   <ul>
//     <li className="list-second-item">Sub-item 1</li>
{
  /* Puoi aggiungere altri sub-items qui */
}
//   </ul>
// )}
// </li>

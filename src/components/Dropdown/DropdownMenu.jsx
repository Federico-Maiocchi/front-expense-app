import { useEffect, useRef, useState } from "react";
import "../../sass/dropdownMenu/dropdownMenu.scss";

function DropdownMenu({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev)
    };

    const closeDropdown = (event) => {
        //CHiudi il drop down se si clicca fuori dal componente
        if( dropdownRef.current && !dropdownRef.current.contains(event.target))
            setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener("click", closeDropdown);
        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    }, []);


  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="button-dropdown">
        <i className="fas fa-ellipsis-v cursor-pointer"></i>
      </button>
      {isOpen && (
        <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
          <ul>{children}</ul>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;

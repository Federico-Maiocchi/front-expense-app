import { useState } from 'react';

// Custom Hook per il toggle
const useToggle = (initialState = {}) => {
  const [openItems, setOpenItems] = useState(initialState);

  const toggleItem = (itemId) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  return [openItems, toggleItem];
};

export default useToggle;
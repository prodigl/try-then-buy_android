import React, { createContext, useState, useEffect, useContext } from "react";

export const CategoryContext = createContext();

const StateProvider = ({ children }) => {
  const [category, setCategory] = useState([]);

  const updateCategory = (props) => {
    setCategory([props]);
  };

  const [mainCategory, setMaincategory] = useState([]);

  const updateMainCategory = (props) => {
    setMaincategory([props]);
  };

  return (
    <>
      <CategoryContext.Provider
        value={{ category, updateCategory, mainCategory, updateMainCategory }}
      >
        {children}
      </CategoryContext.Provider>
    </>
  );
};

export default StateProvider;

// export const CatContext = () => {

//     return useContext(CategoryContext);
// }

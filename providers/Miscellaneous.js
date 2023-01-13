import { useContext, createContext, useState } from "react";

const Miscellaneous = createContext();
const MiscComponent = ({ children }) => {
  const [isSliderActive, setSliderActive] = useState(false);
  const updateSliderActive = () => setSliderActive(true);
  const updateSliderDeactive = () => setSliderActive(false);

  const [isLogged, setLogged] = useState(false);

  const activeLogged = () => {
    setLogged(true);
    localStorage.setItem("logged", "true");
    
  };
  const deActiveLogged = () => {
    setLogged(false)
    localStorage.setItem("logged", "false");
  };

  return (
    <>
      <Miscellaneous.Provider
        value={{
          isSliderActive,
          updateSliderActive,
          updateSliderDeactive,
          isLogged,
          activeLogged,
          deActiveLogged,
          setLogged
        }}
      >
        {children}
      </Miscellaneous.Provider>
    </>
  );
};

export const MiscellaneousProvider = () => {
  return useContext(Miscellaneous);
};

export default MiscComponent;

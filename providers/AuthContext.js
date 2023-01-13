import { useState, createContext, useContext, useEffect } from "react";

const Auth = createContext();

const AuthContext = ({ children }) => {

  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  const updateUserToken =()=> {
    //Set User Name
    const userNew = JSON.parse(localStorage.getItem("user"));
    if(userNew){
      setUser(userNew);
    }

    //Set token
    const token = localStorage.getItem("token");
    if(token) {
      setToken(token);
    }
  }

  useEffect(() => {
    updateUserToken();
  },[]);
  //Update User
  const updateUser = (props) => {
    setUser(props);
  };

  //Update Token
  const updateToken = (props) => {
    setToken(props);
  };

  //Logout function 
  const userLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); 
    setUser("");
    setToken("");
  };

 


  return (
    <>
      <Auth.Provider
        value={{ user, updateUser, token, updateToken, userLogout }} 
      >
        {children}
      </Auth.Provider>
    </>
  );
};

export const AuthValidation = () => {
  return useContext(Auth);
};

export default AuthContext;

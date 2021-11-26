import {createContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  // dummy user for functionality demonstration, user login function tbc
  const [currentUser, setCurrentUser] = useState({username: "jessjelly"});

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </UserContext.Provider>
  );
};

import { createContext, useState, useEffect } from "react";

const UserContext = createContext({});

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setUser(data);
            setIsLoggedIn(true);
          });
        }
      });
  }, []);

  function login(user) {
    setUser(user)
    setIsLoggedIn(true)
  }

  function logout() {
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <UserContext.Provider value={{ user, isLoggedIn, setUser, setIsLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
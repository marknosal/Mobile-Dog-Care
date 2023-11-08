import { createContext, useState, useEffect } from "react";

const UserContext = createContext({});

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            login(data);
          });
        }
      });
  }, []);

  function login(user) {
    setUser(user)
  }

  function logout() {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
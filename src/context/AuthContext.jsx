import { createContext, useContext, useState } from "react";

const AuthContext = createContext();


export function AuthProvider({ children }) {

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );

  const [user, setUser] = useState(null);


  // Save login tokens
  function saveTokens(access, refresh) {

    setAccessToken(access);
    setRefreshToken(refresh);

    localStorage.setItem(
      "accessToken",
      access
    );

    localStorage.setItem(
      "refreshToken",
      refresh
    );
  }


  // Logout
  function logout() {

    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }


  const isLoggedIn = Boolean(accessToken);


  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        setUser,
        saveTokens,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}
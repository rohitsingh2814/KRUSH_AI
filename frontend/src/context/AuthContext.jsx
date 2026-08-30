import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getMe } from "../services/authService";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);


  // ==========================================
  // CHECK CURRENT USER
  // ==========================================

  useEffect(() => {

    const checkUser = async () => {

      const token =
        localStorage.getItem("token");


      // No token → not logged in

      if (!token) {

        setUser(null);

        setLoading(false);

        return;
      }


      try {

        const data = await getMe();


        if (data.success) {

          setUser(data.user);

          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );

        }

      } catch (error) {

        console.error(
          "Authentication check failed:",
          error
        );

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);

      } finally {

        setLoading(false);

      }

    };


    checkUser();

  }, []);


  // ==========================================
  // LOGIN
  // ==========================================

  const login = (data) => {

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setUser(data.user);
  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);
  };


  const isAuthenticated = !!user;


  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};


export const useAuth = () => {

  return useContext(AuthContext);

};
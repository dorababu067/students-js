import { createContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "../components/axios";

export const AuthContext = createContext({
  token: "",
  loggedIn: false,
  login: (data) => {},
  logout: () => {},
});

function AuthContextProvider(props) {
  const initialToken = Cookies.get("access");
  const [token, setToken] = useState(initialToken);
  const [loading, setLoading] = useState(false);
  const isLoggedIn = !!token;

  const loginHandler = async (data) => {
    setLoading(true);
    const response = await axios.post("/token/", data);

    // save token in cookie
    Cookies.set("access", response.data["access"]);
    setToken(response.data["access"]);
    setLoading(false);
  };
  const logoutHandler = () => {
    Cookies.remove("access");
    setToken(null);
  };

  const contextData = {
    token: token,
    loggedIn: isLoggedIn,
    loading: loading,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

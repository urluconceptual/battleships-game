import React, { createContext, useContext, useState } from "react";
import { getUserDetails, login, register } from "../api";

interface IAuthContext {
  token: string;
  userDetails: {
    currentlyGamesPlaying: number;
    gamesLost: number;
    gamesPlayed: number;
    gamesWon: number;
    user: {
      email: string;
      id: string;
    };
  };
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  getUserDetails: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  token: "",
  userDetails: {
    currentlyGamesPlaying: 0,
    gamesLost: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    user: {
      email: "",
      id: "",
    },
  },
  login: async () => {},
  register: async () => {},
  getUserDetails: async () => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string>("");
  const [userDetails, setUserDetails] = useState<{
    currentlyGamesPlaying: number;
    gamesLost: number;
    gamesPlayed: number;
    gamesWon: number;
    user: {
      email: string;
      id: string;
    };
  }>({
    currentlyGamesPlaying: 0,
    gamesLost: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    user: {
      email: "",
      id: "",
    },
  });

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    try {
      const result = await login(email, password);
      setToken(result);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleRegister = async (email: string, password: string) => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      await register(email, password);
      alert("User created! Go back to login to log in.");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGetUserDetails = async () => {
    try {
      const result = await getUserDetails(token);
      setUserDetails(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login: handleLogin,
        register: handleRegister,
        userDetails,
        getUserDetails: handleGetUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

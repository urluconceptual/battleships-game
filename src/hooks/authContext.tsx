import React, { createContext, useContext, useState } from "react";
import {
  createGame,
  getAllGames,
  getUserDetails,
  login,
  register,
} from "../api";

export type Game = {
  id: string;
  status: string;
  player1: Player;
  player1Id: string;
  player2: Player;
  player2Id: string;
  playerToMoveId: string;
};

export type GamesData = {
  total: number;
  games: Game[];
};

export type Player = {
  email: string;
  id: string;
};

interface IAuthContext {
  token: string;
  userDetails: {
    currentlyGamesPlaying: number;
    gamesLost: number;
    gamesPlayed: number;
    gamesWon: number;
    user: Player;
  };
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  getUserDetails: () => Promise<void>;
  getGames: () => Promise<void>;
  games: GamesData | null;
  createGame: () => Promise<void>;
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
  getGames: async () => {},
  games: null,
  createGame: async () => {},
});

function extractShape(obj) {
  const shape = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value === null) {
        shape[key] = "null";
      } else if (Array.isArray(value)) {
        shape[key] =
          value.length > 0 ? "array of " + typeof value[0] : "empty array";
      } else {
        shape[key] = typeof value;
      }
    }
  }
  return shape;
}

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
  const [games, setGames] = useState();

  const handleGetAllGames = async () => {
    try {
      const res = await getAllGames(token);
      setGames(res);
    } catch (error) {
      alert(error.message);
    }
  };

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

  const handleCreateGame = async () => {
    try {
      const result = await createGame(token);
      alert("Game created! Game ID: " + result.id);
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
        games,
        getGames: handleGetAllGames,
        createGame: handleCreateGame,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

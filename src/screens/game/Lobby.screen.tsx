import { useEffect } from "react";
import Lobby from "../../components/Lobby";
import { useAuth } from "../../hooks/authContext";

const LobbyScreen = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.getGames();
  }, []);

  const handleCreateGame = async () => {
    auth.createGame();
    auth.getGames();
  };

  return <Lobby games={auth.games} createGame={handleCreateGame} />;
};

export default LobbyScreen;

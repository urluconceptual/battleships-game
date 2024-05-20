import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import Lobby from "../../components/Lobby";
import { useAuth } from "../../hooks/authContext";
import { GameRouteNames } from "../../router/route-names";

const LobbyScreen = () => {
  const navigation = useNavigation<any>();
  const auth = useAuth();

  useEffect(() => {
    auth.getGames();
  }, []);

  const handleCreateGame = async () => {
    auth.createGame();
    navigation.navigate(GameRouteNames.TABLE);
  };

  const handleJoinGame = async (gameId: string) => {
    if (auth.joinGame(gameId)) navigation.navigate(GameRouteNames.TABLE);
  };

  return (
    <Lobby
      games={auth.games}
      createGame={handleCreateGame}
      joinGame={handleJoinGame}
    />
  );
};

export default LobbyScreen;

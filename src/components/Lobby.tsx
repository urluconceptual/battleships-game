import React, { useState } from "react";
import styled from "styled-components/native";
import { GamesData } from "../hooks/authContext";

const Container = styled.ScrollView`
  width: 100%;
  display: flex;
  padding: 50px;
`;

const Card = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: lightgrey;
  border-radius: 5px;
  justify-content: center;
  align-items: flex-start;
  margin: 10px 0;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 30px;
  border: 1px solid;
  margin-bottom: 10px;
  padding: 8px;
`;

const StyledText = styled.Text`
  font-family: "RobotoMono-Regular";
`;

const SimpleText = styled.Text`
  margin: 10px;
`;

const ButtonText = styled.Text``;

const Title = styled.Text`
  font-family: "RobotoMono-Regular";
  font-size: 24px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
  border-radius: 5px;
`;

export interface ILobby {
  games: GamesData;
  createGame: () => void;
  joinGame: (gameId: string) => void;
}

const Lobby: React.FC<ILobby> = ({ games, createGame, joinGame }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games?.games.filter(
    (game) =>
      game.id.includes(searchQuery) ||
      game.status.includes(searchQuery) ||
      game.playerToMoveId.includes(searchQuery) ||
      (game.player1?.email && game.player1.email.includes(searchQuery)) ||
      (game.player2?.email && game.player2.email.includes(searchQuery))
  );

  return (
    <Container
      contentContainerStyle={{
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Title>Games</Title>
      <Input
        placeholder="Search games..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button onPress={createGame}>
        <StyledText>Create new game</StyledText>
      </Button>
      {!games && <SimpleText>Loading...</SimpleText>}
      {filteredGames?.map((game) => {
        return (
          <Card key={game.id}>
            <SimpleText>Game ID: {game.id}</SimpleText>
            <SimpleText>Status: {game.status}</SimpleText>
            <SimpleText>Player to move: {game.playerToMoveId}</SimpleText>
            <SimpleText>Player 1: {game.player1?.email}</SimpleText>
            <SimpleText>Player 2: {game.player2?.email}</SimpleText>
            <Button onPress={() => joinGame(game.id)}>
              <ButtonText>Join game</ButtonText>
            </Button>
          </Card>
        );
      })}
    </Container>
  );
};

export default Lobby;

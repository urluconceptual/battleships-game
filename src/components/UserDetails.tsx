import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
`;

const StyledText = styled.Text`
  font-family: "RobotoMono-Regular";
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

const Title = styled.Text`
  font-family: "RobotoMono-Regular";
  font-size: 24px;
`;

export interface IUserDetails {
  details: {
    currentlyGamesPlaying: number;
    gamesLost: number;
    gamesPlayed: number;
    gamesWon: number;
    user: {
      email: string;
      id: string;
    };
  };
}

const UserDetails: React.FC<IUserDetails> = ({ details }) => {
  return (
    <Container>
      <Title>My profile</Title>
      <StyledText>Id: {details.user.id}</StyledText>
      <StyledText>Email: {details.user.email}</StyledText>
      <Title>My games</Title>
      <StyledText>Games played: {details.gamesPlayed}</StyledText>
      <StyledText>Games won: {details.gamesWon}</StyledText>
      <StyledText>Games lost: {details.gamesLost}</StyledText>
      <StyledText>
        Currently playing: {details.currentlyGamesPlaying}
      </StyledText>

      <Button>
        <StyledText>Logout</StyledText>
      </Button>
    </Container>
  );
};

export default UserDetails;

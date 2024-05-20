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

export interface IMainMenu {
  goToUserDetails: () => void;
}

const MainMenu: React.FC<IMainMenu> = ({ goToUserDetails }) => {
  return (
    <Container>
      <Button onPress={goToUserDetails}>
        <StyledText>My profile</StyledText>
      </Button>
    </Container>
  );
};

export default MainMenu;

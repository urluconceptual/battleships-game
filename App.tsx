import { useFonts } from "expo-font";
import React from "react";
import styled from "styled-components/native";
import { AuthContextProvider } from "./src/hooks/authContext";
import Router from "./src/router";

const StyledText = styled.Text`
  font-family: "RobotoMono-Regular";
`;

export default function App() {
  const [fontsLoaded] = useFonts({
    "RobotoMono-Regular": require("./assets/fonts/RobotoMono-Regular.ttf"),
  });

  return fontsLoaded ? (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  ) : (
    <StyledText>BattleShips is loading...</StyledText>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import styled from "styled-components/native";
import LobbyScreen from "../screens/game/Lobby.screen";
import MainMenuScreen from "../screens/game/MainMenu.screen";
import TableScreen from "../screens/game/Table.screen";
import UserDetailsScreen from "../screens/game/UserDetails.screen";
import { GameRouteNames } from "./route-names";

const GameStack = createNativeStackNavigator();

const StyledText = styled.Text`
  font-family: "RobotoMono-Regular";
`;

const gameRoutes = (
  <GameStack.Navigator>
    <GameStack.Screen
      name={GameRouteNames.MAIN_MENU}
      component={MainMenuScreen}
      options={{
        headerTitle: (props) => <StyledText {...props}>Main Menu</StyledText>,
      }}
    />
    <GameStack.Screen
      name={GameRouteNames.USER_DETAILS}
      component={UserDetailsScreen}
      options={{
        headerTitle: (props) => <StyledText {...props}>My profile</StyledText>,
      }}
    />
    <GameStack.Screen
      name={GameRouteNames.LOBBY}
      component={LobbyScreen}
      options={{
        headerTitle: (props) => <StyledText {...props}>Lobby</StyledText>,
      }}
    />
    <GameStack.Screen
      name={GameRouteNames.TABLE}
      component={TableScreen}
      options={{
        headerTitle: (props) => <StyledText {...props}>Game Table</StyledText>,
      }}
    />
  </GameStack.Navigator>
);

export default gameRoutes;

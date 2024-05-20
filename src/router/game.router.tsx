import { createNativeStackNavigator } from "@react-navigation/native-stack";

import styled from "styled-components/native";
import MainMenuScreen from "../screens/game/MainMenu.screen";
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
  </GameStack.Navigator>
);

export default gameRoutes;

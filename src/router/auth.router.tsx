import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import LoginScreen from "../screens/auth/Login.screen";
import RegisterScreen from "../screens/auth/Register.screen";
import { AuthRouteNames } from "./route-names";

const AuthStack = createNativeStackNavigator();

const StyledText = styled.Text`
  font-family: "RobotoMono-Regular";
`;

const authRoutes = (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen
      name={AuthRouteNames.LOGIN}
      component={LoginScreen}
      options={{
        headerTitle: (props) => <StyledText {...props}>Login</StyledText>,
      }}
    />
    <AuthStack.Screen
      name={AuthRouteNames.REGISTER}
      component={RegisterScreen}
      options={{
        headerTitle: (props) => <StyledText {...props}>Register</StyledText>,
      }}
    />
  </AuthStack.Navigator>
);

export default authRoutes;

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../hooks/authContext";
import authRoutes from "./auth.router";
import gameRoutes from "./game.router";

const Router: React.FC = () => {
  const auth = useAuth();
  return (
    <NavigationContainer>
      {auth.token ? gameRoutes : authRoutes}
    </NavigationContainer>
  );
};

export default Router;

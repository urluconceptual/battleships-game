import { useNavigation } from "@react-navigation/native";
import Login from "../../components/Login";
import { useAuth } from "../../hooks/authContext";
import { AuthRouteNames } from "../../router/route-names";

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const handleGoToRegister = () => {
    navigation.navigate(AuthRouteNames.REGISTER);
  };
  const auth = useAuth();
  return <Login onSubmit={auth.login} goToRegister={handleGoToRegister} />;
};

export default LoginScreen;

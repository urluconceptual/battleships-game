import { useNavigation } from "@react-navigation/native";
import MainMenu from "../../components/MainMenu";
import { GameRouteNames } from "../../router/route-names";

const MainMenuScreen = () => {
  const navigation = useNavigation<any>();
  const handleGoToUserDetails = () => {
    navigation.navigate(GameRouteNames.USER_DETAILS);
  };

  return <MainMenu goToUserDetails={handleGoToUserDetails} />;
};

export default MainMenuScreen;

import { useEffect } from "react";
import UserDetails from "../../components/UserDetails";
import { useAuth } from "../../hooks/authContext";

const UserDetailsScreen = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.getUserDetails();
  }, []);

  return <UserDetails details={auth.userDetails} />;
};

export default UserDetailsScreen;

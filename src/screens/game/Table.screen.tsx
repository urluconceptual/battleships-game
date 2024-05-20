import { useEffect } from "react";
import Table from "../../components/Table";
import { useAuth } from "../../hooks/authContext";

const TableScreen = () => {
  const auth = useAuth();

  const handleOnConfigure = async (configuration) => {
    await auth.sendConfiguration(auth.currentGame.id, configuration);
  };

  useEffect(() => {
    auth.getUserDetails();
  }, []);

  const ships = [
    { x: "", y: 0, size: 6, direction: "HORIZONTAL" },
    { x: "", y: 0, size: 4, direction: "VERTICAL" },
    { x: "", y: 0, size: 3, direction: "HORIZONTAL" },
    { x: "", y: 0, size: 3, direction: "VERTICAL" },
    { x: "", y: 0, size: 2, direction: "HORIZONTAL" },
  ];

  return (
    <Table
      ships={ships}
      onConfigure={handleOnConfigure}
      game={auth.currentGame}
    />
  );
};

export default TableScreen;

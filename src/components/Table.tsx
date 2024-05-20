import React, { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Game, GameConfig, Ship } from "../hooks/authContext";

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

const GridContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
  height: 300px;
`;

const ShipPlacedCell = styled.View`
  width: 30px;
  height: 30px;
  background-color: grey;
  border: 1px solid black;
`;

const ShipNotPlacedCell = styled.View`
  width: 30px;
  height: 30px;
  background-color: lightblue;
  border: 1px solid black;
`;

const StyledText = styled.Text`
  font-family: "RobotoMono-Regular";
`;

const ShipSelection = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
  width: 50%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
  border-radius: 5px;
  margin-top: 20px;
`;

const Title = styled.Text`
  font-family: "RobotoMono-Regular";
  font-size: 24px;
`;

const Label = styled.Text`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "RobotoMono-Regular";
`;

export interface ITable {
  ships: Ship[];
  onConfigure: (configuration: GameConfig) => void;
  game: Game;
}

const Table: React.FC<ITable> = ({ ships, onConfigure, game }) => {
  const [selectedShipIndex, setSelectedShipIndex] = useState<number | null>(
    null
  );
  const [shipPositions, setShipPositions] = useState<Ship[]>(ships);

  const letterToNumber = (letter: string) => {
    return letter.charCodeAt(0) - "A".charCodeAt(0);
  };

  const isOverlapping = (
    x: string,
    y: number,
    size: number,
    direction: string,
    indexToIgnore: number
  ) => {
    const startX = letterToNumber(x);
    const endX = startX + (direction === "HORIZONTAL" ? size - 1 : 0);
    const startY = y;
    const endY = startY + (direction === "VERTICAL" ? size - 1 : 0);

    return shipPositions.some((ship, index) => {
      if (index === indexToIgnore) return false;

      const shipStartX = letterToNumber(ship.x);
      const shipEndX =
        shipStartX + (ship.direction === "HORIZONTAL" ? ship.size - 1 : 0);
      const shipStartY = ship.y;
      const shipEndY =
        shipStartY + (ship.direction === "VERTICAL" ? ship.size - 1 : 0);

      const overlapX = !(endX < shipStartX || startX > shipEndX);
      const overlapY = !(endY < shipStartY || startY > shipEndY);

      return overlapX && overlapY;
    });
  };

  const handleCellPress = (x: string, y: number) => {
    if (selectedShipIndex !== null) {
      const selectedShip = shipPositions[selectedShipIndex];
      if (
        isOverlapping(
          x,
          y,
          selectedShip.size,
          selectedShip.direction,
          selectedShipIndex
        )
      ) {
        Alert.alert("Ships cannot overlap!");
      } else {
        const updatedShips = [...shipPositions];
        updatedShips[selectedShipIndex] = {
          ...updatedShips[selectedShipIndex],
          x,
          y,
        };
        setShipPositions(updatedShips);
        setSelectedShipIndex(null);
      }
    } else {
      Alert.alert("Select a ship first!");
    }
  };

  const handleShipSelect = (index: number) => {
    setSelectedShipIndex(index);
  };

  const handleDirectionChange = (index: number) => {
    const updatedShips = [...shipPositions];
    const currentDirection = updatedShips[index].direction;
    updatedShips[index].direction =
      currentDirection === "HORIZONTAL" ? "VERTICAL" : "HORIZONTAL";
    setShipPositions(updatedShips);
  };

  const handleConfigure = () => {
    const configuration = { ships: shipPositions };
    onConfigure(configuration);
  };

  const isShipPlaced = (x: string, y: number) => {
    return shipPositions.some((ship) => {
      const startX = letterToNumber(ship.x);
      const endX =
        startX + (ship.direction === "HORIZONTAL" ? ship.size - 1 : 0);
      const startY = ship.y;
      const endY = startY + (ship.direction === "VERTICAL" ? ship.size - 1 : 0);
      const currentX = letterToNumber(x);
      return currentX >= startX && currentX <= endX && y >= startY && y <= endY;
    });
  };

  const columnLabels = Array.from({ length: 10 }, (_, index) =>
    String.fromCharCode("A".charCodeAt(0) + index)
  );
  const rowLabels = Array.from({ length: 10 }, (_, index) => index);

  return (
    <Container>
      <Title>Table</Title>
      <ShipSelection>
        {shipPositions.map((ship, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Button onPress={() => handleShipSelect(index)}>
              <StyledText>
                Ship ({ship.size}){" "}
                {ship.direction.charAt(0).toUpperCase() +
                  ship.direction.slice(1).toLowerCase()}
              </StyledText>
            </Button>
            <Button
              onPress={() => handleDirectionChange(index)}
              style={{ marginLeft: 10 }}
            >
              <StyledText>Toggle Direction</StyledText>
            </Button>
          </View>
        ))}
      </ShipSelection>
      <GridContainer>
        <View>
          {rowLabels.map((label) => (
            <Label key={label}>{label}</Label>
          ))}
        </View>
        <View>
          <Row>
            <View style={{ width: 30, height: 30 }}></View>
            {columnLabels.map((label) => (
              <Label key={label}>{label}</Label>
            ))}
          </Row>
          <Grid>
            {rowLabels.map((rowLabel) =>
              columnLabels.map((colLabel) => {
                const shipPlaced = isShipPlaced(colLabel, rowLabel);
                return (
                  <TouchableOpacity
                    key={`${rowLabel}-${colLabel}`}
                    onPress={() => handleCellPress(colLabel, rowLabel)}
                  >
                    {shipPlaced ? <ShipPlacedCell /> : <ShipNotPlacedCell />}
                  </TouchableOpacity>
                );
              })
            )}
          </Grid>
        </View>
      </GridContainer>
      <Button onPress={handleConfigure}>
        <StyledText>Send Configuration</StyledText>
      </Button>
    </Container>
  );
};

export default Table;

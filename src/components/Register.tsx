import React, { useState } from "react";
import styled from "styled-components/native";

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

const Input = styled.TextInput`
  width: 100%;
  height: 30px;
  border: 1px solid;
  margin-bottom: 10px;
  padding: 8px;
`;

const StyledText = styled.Text`
  font-family: "RobotoMono-Regular";
`;

const Title = styled.Text`
  font-family: "RobotoMono-Regular";
  font-size: 24px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
  border-radius: 5px;
`;

export interface ILogin {
  onSubmit: (email: string, password: string) => void;
}

const Register: React.FC<ILogin> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => onSubmit(email, password);

  return (
    <Container>
      <Title>Create your BattleShips account!</Title>
      <Input keyboardType="email-address" onChangeText={setEmail} />
      <Input secureTextEntry onChangeText={setPassword} />
      <Button onPress={handleSubmit}>
        <StyledText>Submit</StyledText>
      </Button>
    </Container>
  );
};

export default Register;

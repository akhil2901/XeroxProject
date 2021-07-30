import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { AuthContext } from "../navigation/AuthProvider";

const Home = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  const handleSignOut = () => {
    logout();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Log Out" onPress={handleSignOut} />
    </View>
  );
};

export default Home;

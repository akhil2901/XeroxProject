import React, { useState, useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "./AuthProvider";

const AuthStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ header: () => null }}
      />
    </AuthStack.Navigator>
  );
}

const AppStack = createStackNavigator();

function AppStackScreen() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{ header: () => null }}
      />
    </AppStack.Navigator>
  );
}

const Routes = () => {
  console.log("Changed");
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onStateChanged = (user) => {
    setUser(user);
    setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [user]);
  console.log("User", user);
  if (initializing) return null;
  return (
    <NavigationContainer>
      {user ? <AppStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default Routes;

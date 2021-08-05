import React, {useState, useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import {AuthContext} from './AuthProvider';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const AuthStack = createStackNavigator();

function AuthStackScreen() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '550521785452-4s1dpv6pbe58hh19lpvh5kcdsg1vq81v.apps.googleusercontent.com',
    });
  }, []);
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{header: () => null}}
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
        options={{header: () => null}}
      />
    </AppStack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

function BottomTabStack() {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff" shifting={true}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: 'purple',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Routes = () => {
  console.log('Changed');
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onStateChanged = user => {
    setUser(user);
    setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [user]);
  console.log('User', user);
  if (initializing) return null;
  return (
    <NavigationContainer>
      {user ? <BottomTabStack /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default Routes;

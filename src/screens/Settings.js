import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {AuthContext} from '../navigation/AuthProvider';

const Settings = ({navigation}) => {
  const {logout} = useContext(AuthContext);

  const handleSignOut = () => {
    logout();
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings.js</Text>
      <Button title="Log Out" onPress={handleSignOut} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});

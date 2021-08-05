import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

const Home = ({navigation}) => {
  const {user} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View>
        <Text>{user.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Home;

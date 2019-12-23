import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Home = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>HELLO WORLD</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    flex: 1,
    width: '100%',
  }
});

export default Home;

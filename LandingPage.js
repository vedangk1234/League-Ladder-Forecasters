// LandingPage.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LEAGUE LADDER FORECASTERS</Text>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Predictions')}
      >
        <Text style={styles.startButtonText}>Make Your Predictions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tableButton}
        onPress={() => navigation.navigate('Standings')}
      >
        <Text style={styles.tableButtonText}>View Live PL Table</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tableButton}
        onPress={() => navigation.navigate('ViewPredictions')}
      >
        <Text style={styles.tableButtonText}>View Your Prediction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tableButton}
        onPress={() => navigation.navigate('Points')}
      >
        <Text style={styles.tableButtonText}>Points</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008000', // Green background
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#000000', // Black text color for the title
    textAlign: 'center',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: 'black', // Black background for the button
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  startButtonText: {
    color: 'white', // White text color for button text
    fontSize: 18,
  },
  tableButton: {
    backgroundColor: 'black', // Black background for the button
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  tableButtonText: {
    color: 'white', // White text color for button text
    fontSize: 18,
  },
  groupButton: {
    backgroundColor: 'black', // Black background for the group button
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  groupButtonText: {
    color: 'white', // White text color for button text
    fontSize: 18,
  },
});

export default LandingPage;

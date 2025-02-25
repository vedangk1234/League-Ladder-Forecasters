import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const teams = [
  "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton",
  "Chelsea", "Crystal Palace", "Everton", "Fulham", "Ipswich Town",

  "Leicester City", "Liverpool", "Manchester City", "Manchester United",
  "Newcastle", "Nottingham Forest", "Tottenham Hotspur", "West Ham United",
  "Wolves", "Southampton"
];

const Predictions = () => {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [predictions, setPredictions] = useState(Array(20).fill(null));
  const [lockedBoxes, setLockedBoxes] = useState(Array(20).fill(false));
  const [finalPredictionPrompt, setFinalPredictionPrompt] = useState(false);
  const navigation = useNavigation(); // Access the navigation object

  const handleTeamSelection = (team) => {
    if (!selectedTeams.includes(team)) {
      setSelectedTeams([...selectedTeams, team]);

      // Check if all teams are selected
      if (selectedTeams.length === 19) {
        setFinalPredictionPrompt(true);
      }
    }
  };

  const handlePredictionClick = (index) => {
    if (!lockedBoxes[index] && selectedTeams.length > 0) {
      const newPredictions = [...predictions];
      newPredictions[index] = selectedTeams[selectedTeams.length - 1];
      setPredictions(newPredictions);

      const newLockedBoxes = [...lockedBoxes];
      newLockedBoxes[index] = true;
      setLockedBoxes(newLockedBoxes);

      setSelectedTeams(selectedTeams.slice(0, -1));

      // Check if all teams are selected
      if (newPredictions.every(prediction => prediction !== null)) {
        setFinalPredictionPrompt(true);
      }
    }
  };

  const handleRemoveTeam = (index) => {
    const teamToRemove = predictions[index];
    if (teamToRemove) {
      const newPredictions = [...predictions];
      newPredictions[index] = null;
      setPredictions(newPredictions);

      const newLockedBoxes = [...lockedBoxes];
      newLockedBoxes[index] = false;
      setLockedBoxes(newLockedBoxes);

      if (!selectedTeams.includes(teamToRemove)) {
        setSelectedTeams([...selectedTeams, teamToRemove]);
      }
    }
  };

  const handleFinalPrediction = () => {
    // Logic to save the final prediction
    fetch('http://192.168.1.9:5000/predictions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'vedang',
        prediction: predictions,
      }),
    })
    .then(() => {
      // Redirect to Standings.js when "Yes" is clicked
      // navigation.navigate('Standings'); // Assuming 'Standings' is the correct route name
    })
    .catch((error) => {
      console.error('Error saving prediction:', error);
    });
  };

  const handleNoButtonClick = () => {
    // Reset the prompt when No is clicked
    setFinalPredictionPrompt(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>

      <FlatList
        data={teams.filter(team => !predictions.includes(team))}
        keyExtractor={(item) => item}
        numColumns={4} // Display in 4 columns
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.teamButton}
            onPress={() => handleTeamSelection(item)}
          >
            <Text style={styles.teamText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={predictions}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.predictionContainer}>
            <TouchableOpacity
              style={[styles.predictionBox, getBoxColor(index)]}
              onPress={() => handlePredictionClick(index)}
              disabled={lockedBoxes[index]}
            >
              <Text style={styles.predictionText}>
                {item || (index + 1).toString()}
              </Text>
              {item && (
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => handleRemoveTeam(index)}
                >
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        )}
      />

      {finalPredictionPrompt && (
        <View style={styles.finalPredictionContainer}>
          <Text style={styles.finalPredictionText}>Is this your final prediction?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.finalButton} onPress={handleFinalPrediction}>
              <Text style={styles.finalButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.finalButton} onPress={handleNoButtonClick}>
              <Text style={styles.finalButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

// Function to determine box color based on index
const getBoxColor = (index) => {
  if (index === 0) return { backgroundColor: '#efd70a' }; // Color for box 1
  if (index >= 1 && index <= 3) return { backgroundColor: '#010E80' }; // Color for boxes 2, 3, 4
  if (index >= 17 && index <= 19) return { backgroundColor: '#ea1c1c' }; // Color for boxes 18, 19, 20
  return { backgroundColor: 'white' }; // Default color for other boxes
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  teamButton: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'black',
    width: '22%', // Smaller and compact
  },
  teamText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  predictionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  predictionBox: {
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    flex: 1,
    position: 'relative',
  },
  predictionText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  finalPredictionContainer: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  finalPredictionText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  finalButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    flex: 1,
    alignItems: 'center',
  },
  finalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Predictions;


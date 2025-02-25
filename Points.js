import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const standingsData = [
  { id: '1', club: 'MCI', MP: 9, W: 7, D: 0, L: 2, GD: +11, Pts: 23 },
  { id: '2', club: 'LIV', MP: 9, W: 7, D: 1, L: 1, GD: +12, Pts: 22 },
  { id: '3', club: 'ARS', MP: 9, W: 5, D: 3, L: 1, GD: +7, Pts: 18 },
  { id: '4', club: 'AVL', MP: 9, W: 5, D: 3, L: 1, GD: +5, Pts: 18 },
  { id: '5', club: 'CHE', MP: 9, W: 5, D: 2, L: 2, GD: +8, Pts: 17 },
  { id: '6', club: 'BHA', MP: 9, W: 4, D: 4, L: 1, GD: +4, Pts: 16 },
  { id: '7', club: 'NFO', MP: 9, W: 4, D: 4, L: 1, GD: +4, Pts: 16 },
  { id: '8', club: 'TOT', MP: 9, W: 4, D: 1, L: 4, GD: +8, Pts: 13 },
  { id: '9', club: 'BRE', MP: 9, W: 4, D: 1, L: 4, GD: 0, Pts: 13 },
  { id: '10', club: 'FUL', MP: 9, W: 3, D: 3, L: 3, GD: 0, Pts: 12 },
  { id: '11', club: 'BOU', MP: 9, W: 3, D: 3, L: 3, GD: 0, Pts: 12 },
  { id: '12', club: 'NEW', MP: 9, W: 3, D: 3, L: 3, GD: -1, Pts: 12 },
  { id: '13', club: 'WHU', MP: 9, W: 3, D: 2, L: 4, GD: -1, Pts: 11 },
  { id: '14', club: 'MUN', MP: 9, W: 3, D: 2, L: 4, GD: -3, Pts: 11 },
  { id: '15', club: 'LEI', MP: 9, W: 2, D: 3, L: 4, GD: -4, Pts: 9 },
  { id: '16', club: 'EVE', MP: 9, W: 2, D: 3, L: 4, GD: -6, Pts: 9 },
  { id: '17', club: 'CRY', MP: 9, W: 1, D: 3, L: 5, GD: -5, Pts: 6 },
  { id: '18', club: 'IPS', MP: 9, W: 0, D: 4, L: 5, GD: -11, Pts: 4 },
  { id: '19', club: 'WOL', MP: 9, W: 0, D: 2, L: 7, GD: -13, Pts: 2 },
  { id: '20', club: 'SOU', MP: 9, W: 0, D: 1, L: 8, GD: -13, Pts: 1 },
];

const teamMapping = {
  MCI: "Manchester City",
  LIV: "Liverpool",
  ARS: "Arsenal",
  AVL: "Aston Villa",
  CHE: "Chelsea",
  BHA: "Brighton",
  NFO: "Nottingham Forest",
  TOT: "Tottenham Hotspur",
  BRE: "Brentford",
  FUL: "Fulham",
  BOU: "Bournemouth",
  NEW: "Newcastle",
  WHU: "West Ham United",
  MUN: "Manchester United",
  LEI: "Leicester City",
  EVE: "Everton",
  CRY: "Crystal Palace",
  IPS: "Ipswich Town",
  WOL: "Wolves",
  SOU: "Southampton"
};

const Points = () => {
  const [userPredictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [calculationDetails, setCalculationDetails] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.9:5000/predictions');
        const data = await response.json();
        setPredictions(data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && userPredictions.length > 0) {
      let totalPoints = 0;
      let wrongPositions = 0;
      let correctPositions = 0;
      let correctUCL = 0;
      let correctEuropa = 0;
      let correctConference = 0;
      let correctRelegation = 0;

      userPredictions.forEach((prediction, index) => {
        const fullName = prediction.team;
        const abbreviation = Object.keys(teamMapping).find(
          key => teamMapping[key] === fullName
        );

        const actualPosition = standingsData.findIndex(
          team => team.club === abbreviation
        );

        if (actualPosition === index) {
          totalPoints += 3;
          correctPositions++;

          if (index < 4) {
            correctUCL++;
            if (correctUCL === 4) totalPoints += 5;
          }
          if (index >= 4 && index < 6) {
            correctEuropa++;
            if (correctEuropa === 2) totalPoints += 3;
          }
          if (index >= 6 && index < 8) {
            correctConference++;
            if (correctConference === 2) totalPoints += 1;
          }
          if (index >= 17) {
            correctRelegation++;
            if (correctRelegation === 3) totalPoints += 3;
          }
        } else {
          wrongPositions++;
        }
      });

      const penaltyPoints = Math.floor(wrongPositions / 5);
      totalPoints = totalPoints - penaltyPoints;

      const calculation = `
        Correct Positions = ${correctPositions} = ${correctPositions * 3} points
        Wrong Positions   = ${wrongPositions} = ${wrongPositions > 0 ? `-${penaltyPoints} point${penaltyPoints > 1 ? 's' : ''}` : '0 points'}
        Correct UCL spots = ${correctUCL} ${correctUCL === 4 ? ' = +5 points' : ''}
        Correct Europa League spots = ${correctEuropa} ${correctEuropa === 2 ? ' = +3 points' : ''}
        Correct Conference League spots = ${correctConference} ${correctConference === 2 ? ' = +1 point' : ''}
        Correct Relegation = ${correctRelegation} ${correctRelegation === 3 ? ' = +3 points' : ''}
        Total Points = ${totalPoints}
      `.trim(); // Added .trim() to remove extra whitespace

      setPoints(totalPoints);
      setCalculationDetails(calculation);
    }
  }, [loading, userPredictions]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Total Points: <Text style={styles.bold}>{points}</Text></Text>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {userPredictions.map((prediction, index) => {
          const fullName = prediction.team;
          const abbreviation = Object.keys(teamMapping).find(
            key => teamMapping[key] === fullName
          );

          const actualPosition = standingsData.findIndex(
            team => team.club === abbreviation
          );

          const isCorrect = actualPosition === index;
          return (
            <View
              key={index}
              style={[styles.predictionItem, isCorrect ? styles.correct : styles.wrong]}
            >
              <Text style={styles.predictionText}>{index + 1}. {fullName}</Text>
            </View>
          );
        })}
        <Text style={styles.calculationText}>{calculationDetails.split('\n').map((line, index) => (
          <Text key={index}>
            {line} 
            {'\n'}
          </Text>
        ))}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008000', // Green background
    paddingHorizontal: 20,
    paddingTop: 40, // Adjusted padding top for the header
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 32, // Increased font size
    fontWeight: 'bold',
    color: '#000', // Black text for header
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: '#008000', // Green background for header
    width: '100%',
    marginBottom: 20, // Space below the header
  },
  predictionItem: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  correct: {
    backgroundColor: '#4CAF50', // Green for correct predictions
  },
  wrong: {
    backgroundColor: '#f44336', // Red for wrong predictions
  },
  predictionText: {
    color: '#000', // Black text for predictions
    fontWeight: 'bold',
    fontSize: 16,
  },
  calculationText: {
    marginTop: 20, // Margin to separate calculations from predictions
    fontSize: 16,
    color: '#000', // Black text for calculations
    textAlign: 'left', // Left-aligned text
    fontFamily: 'monospace',
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Points;

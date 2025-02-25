import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

// Create an image mapping
const clubImages = {
    "Manchester City": require('../assets/images/mci.png'),
    "Liverpool": require('../assets/images/liv.png'),
    "Arsenal": require('../assets/images/ars.png'),
    "Aston Villa": require('../assets/images/avl.png'),
    "Chelsea": require('../assets/images/che.png'),
    "Brighton": require('../assets/images/bha.png'),
    "Nottingham Forest": require('../assets/images/nfo.png'),
    "Tottenham Hotspur": require('../assets/images/tot.png'),
    "Brentford": require('../assets/images/bre.png'),
    "Fulham": require('../assets/images/ful.png'),
    "Bournemouth": require('../assets/images/bou.png'),
    "Newcastle": require('../assets/images/new.png'),
    "West Ham United": require('../assets/images/whu.png'),
    "Manchester United": require('../assets/images/mun.png'),
    "Leicester City": require('../assets/images/lei.png'),
    "Everton": require('../assets/images/eve.png'),
    "Crystal Palace": require('../assets/images/cry.png'),
    "Ipswich Town": require('../assets/images/ips.png'),
    "Wolves": require('../assets/images/wol.png'),
    "Southampton": require('../assets/images/sou.png'),
};

const ViewPredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.9:5000/predictions'); // Your API endpoint
        const data = await response.json();
        setPredictions(data); // Set the fetched predictions
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []);

  // Render loading state or predictions
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading predictions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Pos</Text>
        <Text style={styles.headerText}>Club</Text>
      </View>

      <FlatList
        data={predictions}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, styles.cellBold]}>{index + 1}</Text>
            <View style={styles.clubContainer}>
              <Image source={clubImages[item.team]} style={styles.clubImage} />
              <Text style={styles.cell}>{item.team}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.sr_no.toString()} // Use a unique key for each item
        initialNumToRender={10} // Render only the first 10 items initially
        maxToRenderPerBatch={10} // Max items rendered per batch
        showsVerticalScrollIndicator={false} // Hide the scrollbar
        style={styles.flatList} // Apply styles to the FlatList
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008000', // Green background
    paddingTop: 20, // Adjust for the header space
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#008000', // Green background for header
  },
  headerText: {
    color: '#000', // Header text color
    fontWeight: 'bold',
    fontSize: 25, // Increased font size for visibility
    flex: 1, // Ensures proper spacing
    textAlign: 'left', // Left-align text
  },
  row: {
    flexDirection: 'row',
    padding: 24,
    justifyContent: 'flex-start', // Align items to the start (left)
  },
  clubContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically center
    flex: 1, // Take full width
  },
  cell: {
    flex: 1,
    textAlign: 'left', // Align text to the left
    fontWeight: 'bold', // Made row text bold
    fontSize: 17, // Increased font size for better visibility
  },
  cellBold: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'left', // Align position number to the left
  },
  clubImage: {
    width: 50,
    height: 50,
    marginRight: 10, // Space between logo and text
  },
  flatList: {
    flex: 1, // Make FlatList take the full height of the container
  },
});

export default ViewPredictions;

import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

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

// Create an image mapping
const clubImages = {
  MCI: require('../assets/images/mci.png'),
  LIV: require('../assets/images/liv.png'),
  ARS: require('../assets/images/ars.png'),
  AVL: require('../assets/images/avl.png'),
  CHE: require('../assets/images/che.png'),
  BHA: require('../assets/images/bha.png'),
  NFO: require('../assets/images/nfo.png'),
  TOT: require('../assets/images/tot.png'),
  BRE: require('../assets/images/bre.png'),
  FUL: require('../assets/images/ful.png'),
  BOU: require('../assets/images/bou.png'),
  NEW: require('../assets/images/new.png'),
  WHU: require('../assets/images/whu.png'),
  MUN: require('../assets/images/mun.png'),
  LEI: require('../assets/images/lei.png'),
  EVE: require('../assets/images/eve.png'),
  CRY: require('../assets/images/cry.png'),
  IPS: require('../assets/images/ips.png'),
  WOL: require('../assets/images/wol.png'),
  SOU: require('../assets/images/sou.png'),
};

const Standings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premier League Standings</Text>
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>Pos                          Club</Text>
        </View>     
        <View style={styles.headerRight}>
          <Text style={styles.headerText}>MP</Text>
          <Text style={styles.headerText}>W</Text>
          <Text style={styles.headerText}>D</Text>
          <Text style={styles.headerText}>L</Text>
          <Text style={styles.headerText}>GD</Text>
          <Text style={styles.headerText}>Pts</Text>
        </View>
      </View>

      <FlatList
        data={standingsData}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={[styles.cell, styles.cellBold]}>{index + 1}</Text>
              <Image source={clubImages[item.club]} style={styles.clubImage} />
              <Text style={styles.cellClub}>{item.club}</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.cell}>{item.MP}</Text>
              <Text style={styles.cell}>{item.W}</Text>
              <Text style={styles.cell}>{item.D}</Text>
              <Text style={styles.cell}>{item.L}</Text>
              <Text style={styles.cell}>{item.GD}</Text>
              <Text style={styles.cellPts}>{item.Pts}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    paddingTop: 40,
    backgroundColor: '#008000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#008000',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '55%',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 24,
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '55%',
  },
  cell: {
    textAlign: 'center',
    width: '15%',
    fontSize: 12,
  },
  cellBold: {
    fontWeight: 'bold',
  },
  cellClub: {
    textAlign: 'left',
    fontWeight: 'bold',
    width: '40%',
  },
  cellPts: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: '15%',
    fontSize: 14,
    color: 'black', // Optional: highlighted color for Pts column
  },
  clubImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});


export default Standings;

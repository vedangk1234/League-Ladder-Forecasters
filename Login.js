import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleLogin = async () => {
    const url = 'http://192.168.1.9:5000/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.error || 'Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  const handleSignup = async () => {
    if (password !== repeatPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const url = 'http://192.168.1.9:5000/signup';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
        setIsLogin(true); // Redirect to Login after successful signup
      } else {
        Alert.alert('Error', data.error || 'Signup failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      {isLogin ? (
        <>
          <Text style={styles.header}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
          <Text style={styles.toggleText}>
            Don't have an account?{' '}
            <Text style={styles.toggleLink} onPress={() => setIsLogin(false)}>
              Sign Up
            </Text>
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.header}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Repeat Password"
            value={repeatPassword}
            secureTextEntry
            onChangeText={setRepeatPassword}
          />
          <Button title="Sign Up" onPress={handleSignup} />
          <Text style={styles.toggleText}>
            Already have an account?{' '}
            <Text style={styles.toggleLink} onPress={() => setIsLogin(true)}>
              Login
            </Text>
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  toggleText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
  toggleLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default LoginSignUp;

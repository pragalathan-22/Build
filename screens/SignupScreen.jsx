import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icon package for eye icons
import { auth } from '../Firebase/firebaseConfig'; // Import auth from firebaseConfig
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; // Firebase authentication methods

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords Do Not Match', 'Please ensure the passwords match.');
      return;
    }
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Send a verification email
      await sendEmailVerification(userCredential.user);

      Alert.alert('Verification Email Sent', 'Please check your inbox to verify your email.');

      // Ask user to verify email before proceeding
      navigation.navigate('EmailVerification'); // Navigate to a new screen where the user is instructed to check their email
    } catch (error) {
      console.error(error.message);
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo */}
        <Image source={require('../assets/icons/CooperBuild-Logo-Header-1024x294.png')} style={styles.logo} />

        {/* Welcome text */}
        <Text style={styles.welcomeText}>Create an Account</Text>

        {/* Email input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Password input with eye icon */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm password input with eye icon */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!confirmPasswordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <Ionicons
              name={confirmPasswordVisible ? 'eye' : 'eye-off'}
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        {/* Signup button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Already have an account? */}
        <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.alreadyText}>
            Already have an account?{' '}
            <Text style={styles.signInText}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#2F4561', // Navy blue background
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // White text
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#ffffff', // White background for input
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333', // Dark text
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  signupButton: {
    backgroundColor: '#ff9900',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  alreadyText: {
    marginTop: 20,
    color: '#ddd',
    fontSize: 16,
  },
  signInText: {
    color: '#ff9900', // Orange color
    fontWeight: 'bold',
  },
});

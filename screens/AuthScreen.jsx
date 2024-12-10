import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../Firebase/firebaseConfig';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';

export default function AuthScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '600897337641-6r0prkm91vv2rsrbcrsfsaapb5da3edd.apps.googleusercontent.com',
    androidClientId: '600897337641-6r0prkm91vv2rsrbcrsfsaapb5da3edd.apps.googleusercontent.com',
    webClientId: '600897337641-6r0prkm91vv2rsrbcrsfsaapb5da3edd.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          onLogin();
        })
        .catch((error) => {
          console.error(error);
          Alert.alert(
            'Google Login Failed',
            'Something went wrong with Google authentication.'
          );
        });
    }
  }, [response]);

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (error) {
      console.error(error.message);
      Alert.alert('Login Failed', 'Incorrect email or password.');
    }
  };

  const handleGoogleLogin = async () => {
    await promptAsync();
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../assets/icons/CooperBuild-Logo-Header-1024x294.png')}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Welcome to Cooper Build</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
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
        <TouchableOpacity style={styles.loginButton} onPress={handleEmailLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.separator}>
          <Text style={styles.orText}>OR</Text>
        </View>
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <FontAwesome name="google" size={24} color="#333" />
        </TouchableOpacity>

        {/* Sign Up Section */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={navigateToSignup}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#2F4561',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    color: '#ffffff',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#ff9900',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: '90%',
  },
  orText: {
    textAlign: 'center',
    color: '#ddd',
    fontSize: 16,
  },
  googleButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#ffffff',
    fontSize: 16,
  },
  signupLink: {
    color: '#ff9900',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

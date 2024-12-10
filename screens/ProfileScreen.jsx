import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Header from '../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 234 567 8900');
  const [address, setAddress] = useState('123 Main St, Anytown, USA');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    // Add logic to logout (clear tokens, reset state, etc.)
    navigation.navigate('AuthStack', { screen: 'Auth' }); // Navigate to the AuthScreen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={t('Profile')} />
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('name')}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={t('enterName')}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('email')}</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder={t('enterEmail')}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('phone')}</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder={t('enterPhone')}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('address')}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={address}
            onChangeText={setAddress}
            placeholder={t('enterAddress')}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>{t('saveChanges')}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Button at the Bottom */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>{t('logout')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#34C759', // Green color for logout button
    paddingVertical: 10, // Smaller padding
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    position: 'absolute', // Fixed position at the bottom
    bottom: 10, // 10px from the bottom
    width: '30%', // Full width
    alignSelf: 'center', // Center the button
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

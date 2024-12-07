import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Header from '../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 234 567 8900');
  const [address, setAddress] = useState('123 Main St, Anytown, USA');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={t('Profile')} />
      <ScrollView style={styles.container}>
        {/* <Text style={styles.title}>{t('profile')}</Text> */}
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

        {/* <View style={styles.languageContainer}>
          <Text style={styles.label}>{t('language')}</Text>
          <View style={styles.languageButtons}>
            <TouchableOpacity
              style={[styles.languageButton, i18n.language === 'en' && styles.activeLanguage]}
              onPress={() => changeLanguage('en')}
            >
              <Text style={[styles.languageButtonText, i18n.language === 'en' && styles.activeButtonText]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.languageButton, i18n.language === 'es' && styles.activeLanguage]}
              onPress={() => changeLanguage('es')}
            >
              <Text style={[styles.languageButtonText, i18n.language === 'es' && styles.activeButtonText]}>Español</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>{t('saveChanges')}</Text>
        </TouchableOpacity>
      </ScrollView>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
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
  languageContainer: {
    marginTop: 20,
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  languageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeLanguage: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  languageButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  activeButtonText: {
    color: 'white',
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
});

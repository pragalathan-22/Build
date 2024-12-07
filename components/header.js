import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import NotificationIcon from '../assets/icons/NotificationIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
export default function Header({ title }) {
    const { t, i18n } = useTranslation();
  const [hasNotification, setHasNotification] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    setModalVisible(false);
  };


  return (
    <View style={styles.header}>
      {/* Left Section with Logo */}
      {/* <View style={styles.leftSection}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View> */}

      {/* Center Section with Title */}
      <View style={styles.centerSection}>
        <Text style={styles.pageTitle}>{title}</Text>
      </View>

      {/* Right Section with Icons */}
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton} onPress={() => alert('Notification clicked!')}>
          <NotificationIcon color="#000" size={28} hasNotification={hasNotification} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.languageButton} onPress={() => setModalVisible(true)}>
          <Icon name="language" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Language Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Language</Text>

            {/* Language Options as TouchableOpacity with Background Highlight */}
            <TouchableOpacity
              style={[styles.languageOption, selectedLanguage === 'en' && styles.selectedLanguage]}
              onPress={() => handleLanguageChange('en')}
            >
              {selectedLanguage === 'en' && (
                <Icon name="check" size={20} color="#fff" style={styles.checkIcon} />
              )}
              <Text style={[styles.languageOptionText, selectedLanguage === 'en' && styles.selectedText]}>English</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.languageOption, selectedLanguage === 'es' && styles.selectedLanguage]}
              onPress={() => handleLanguageChange('es')}
            >
              {selectedLanguage === 'es' && (
                <Icon name="check" size={20} color="#fff" style={styles.checkIcon} />
              )}
              <Text style={[styles.languageOptionText, selectedLanguage === 'es' && styles.selectedText]}>Español</Text>
            </TouchableOpacity>

            {/* Add more languages as needed */}

            {/* Close Button with Updated Color */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  leftSection: {
    width: 50, // Space for the logo
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 15,
  },
  languageButton: {
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 250,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  languageOptionText: {
    fontSize: 16,
    color: '#000',
  },
  selectedLanguage: {
    backgroundColor: '#007AFF',  // Blue color for selected language
  },
  checkIcon: {
    marginRight: 10,  // Space between the arrow and the language text
  },
  selectedText: {
    color: '#fff',  // White color for the selected text
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#28a745',  // Green color for close button
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

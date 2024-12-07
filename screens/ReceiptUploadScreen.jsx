import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReceiptUploadScreen({ route, navigation }) {
  const { t } = useTranslation();
  const [receiptImages, setReceiptImages] = useState([]);

  // Request permissions for camera and library
  const requestPermissions = async () => {
    let hasPermission = false;

    if (Platform.OS === 'ios') {
      // iOS permissions for camera and media library
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      // Check if both permissions are granted
      hasPermission = cameraStatus.granted && libraryStatus.granted;

      if (!hasPermission) {
        alert('iOS permissions are required for camera and photo library!');
      }
    } else if (Platform.OS === 'android') {
      // Android permissions for camera and media library
      const cameraPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      const libraryPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );

      // Check if both permissions are granted
      hasPermission = cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
        libraryPermission === PermissionsAndroid.RESULTS.GRANTED;

      if (!hasPermission) {
        alert('Android permissions are required for camera and photo library!');
      }
    }

    return hasPermission;
  };

  // Pick multiple images from gallery
  const pickImages = async () => {
    // const hasPermission = await requestPermissions();
    // if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: false,
      allowsMultipleSelection: true, // Enable multiple image selection
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setReceiptImages([...receiptImages, ...selectedImages]); // Add new images to the list
    }
  };

  // Take photo using camera
  const takePhoto = async () => {
    // const hasPermission = await requestPermissions();
    // if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false, // Disable cropping option
    });

    if (!result.canceled) {
      setReceiptImages([...receiptImages, result.assets[0].uri]); // Add new photo to the list
    }
  };

  // Remove image from the list
  const removeImage = (uri) => {
    setReceiptImages(receiptImages.filter((image) => image !== uri));
  };

  // Submit the receipt
  const handleSubmit = () => {
    console.log('Submitting receipt:', { receiptImages });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('Upload Receipt')} />

      {/* Image Gallery */}
      {receiptImages.length > 0 ? (
        <FlatList
          data={receiptImages}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.receiptImage} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(item)}
              >
                <Ionicons name="close-circle" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.imageGallery}
        />
      ) : (
        <View style={styles.emptyGallery}>
          <Text style={styles.emptyText}>{t('No Images Selected')}</Text>
        </View>
      )}

      {/* Buttons for picking images */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
          <Ionicons name="camera" size={24} color="white" />
          <Text style={styles.buttonText}>{t('Take Photo')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImages}>
          <Ionicons name="image" size={24} color="white" />
          <Text style={styles.buttonText}>{t('Select Images')}</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          !receiptImages.length && styles.disabledButton,
        ]}
        onPress={handleSubmit}
        disabled={!receiptImages.length}
      >
        <Text style={styles.submitButtonText}>{t('Submit Receipt')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  imageGallery: {
    margin: 20,
  },
  imageContainer: {
    marginBottom: 15,
    marginRight: 15,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  receiptImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 50,
  },
  emptyGallery: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  emptyText: {
    color: '#aaa',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  cameraButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

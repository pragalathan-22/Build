import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  TextInput
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/header';
import { Ionicons } from '@expo/vector-icons';
import ProjectSelector from "../components/project";
import * as TaskManager from 'expo-task-manager';
const LOCATION_TASK_NAME = 'background-location-task';
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('TaskManager Error:', error);
    return;
  }

  if (data) {
    const { locations } = data;
    console.log('Locations:', locations[0].coords);
  }
});
const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [timer, setTimer] = useState(0);
  const [location, setLocation] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { id: 1, name: 'Project A', latitude: 37.7749, longitude: -122.4194 },
    { id: 2, name: 'Project B', latitude: 37.8044, longitude: -122.2711 },
    { id: 3, name: 'Project C', latitude: 37.7849, longitude: -122.4094 },
  ];
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let interval;
    if (isCheckedIn) {
      startLocationTracking();
      interval = setInterval(() => setTimer((prevTimer) => prevTimer + 1), 1000);
    } else {
      stopLocationTracking();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn]);

  const startLocationTracking = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location in background was denied');
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 10000, // Update every 1 minute
      distanceInterval: 0, // Update regardless of distance
    });

    console.log('Background location tracking started');
  };

  const stopLocationTracking = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log('Background location tracking stopped');
    }
  };

  const handleCheckInOut = () => {
    setIsCheckedIn(!isCheckedIn);
    if (!isCheckedIn) {
      setTimer(0);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={t('Home')} />
      <ScrollView contentContainerStyle={styles.container}>
          <ProjectSelector
              projects={projects}
              onSelect={(projectName) => setSelectedProject(projectName)}
              selectedProject={selectedProject}
            />

        {/* Time Tracking */}
        <View style={styles.timeTrackingContainer}>
          <Text style={styles.title}>{t('timeTracking')}</Text>
          <Text style={styles.timer}>{formatTime(timer)}</Text>
          <TouchableOpacity
            style={[styles.button, isCheckedIn ? styles.checkOutButton : styles.checkInButton]}
            onPress={handleCheckInOut}
          >
            <Text style={styles.buttonText}>
              {isCheckedIn ? t('checkOut') : t('checkIn')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Map Section */}
        {location && (
          <View style={styles.mapContainer}>
            <Text style={styles.mapTitle}>{t('currentLocation')}</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title={t('yourLocation')}
              />
            </MapView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  projectContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 2,
  },
  projectButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    backgroundColor: '#EAF5FF',
  },
  projectButtonText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  projectItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  projectName: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F44336',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  timeTrackingContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  timer: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#007AFF',
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 10,
  },
  checkInButton: {
    backgroundColor: '#4CAF50',
  },
  checkOutButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    backgroundColor: '#FFF',
    padding: 10,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  map: {
    width: '100%',
    height: 200,
  },
});

export default HomeScreen;

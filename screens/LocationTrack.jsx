import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error("Task Manager Error:", error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log("Background Location:", locations);

    // Use an EventEmitter or a custom storage to reflect real-time updates
  }
});

export default function LocationTrack() {
  const [locationHistory, setLocationHistory] = useState([]);

  useEffect(() => {
    const checkTrackingStatus = async () => {
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log("Tracking status:", hasStarted);
    };

    checkTrackingStatus();
  }, []);

  const startLocationTracking = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        distanceInterval: 0, // Trigger on every movement
        timeInterval: 10000, // Trigger every 10 seconds
        foregroundService: {
          notificationTitle: 'Location Tracking',
          notificationBody: 'Tracking your location in the background.',
        },
      });

      // Start fetching real-time updates
      const location = await Location.getCurrentPositionAsync({});
      addLocation(location);

      Alert.alert("Location tracking started!");
    } else {
      Alert.alert("Permission not granted!");
    }
  };

  const stopLocationTracking = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    Alert.alert("Tracking stopped!");
  };

  const addLocation = (location) => {
    const { coords } = location;
    const timestamp = new Date(location.timestamp).toLocaleString();
    setLocationHistory((prevState) => [
      {
        id: Date.now().toString(),
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp,
      },
      ...prevState,
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real-Time Location Tracker</Text>

      <View style={styles.buttonContainer}>
        <Button title="Start Tracking" onPress={startLocationTracking} />
        <Button title="Stop Tracking" onPress={stopLocationTracking} />
      </View>

      <FlatList
        data={locationHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text style={styles.coordinates}>
              Latitude: {item.latitude}, Longitude: {item.longitude}
            </Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    marginTop:20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  locationItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  coordinates: {
    fontSize: 16,
    color: '#555',
  },
  timestamp: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

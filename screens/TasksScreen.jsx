import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Expo icons

import Header from '../components/header'; // Import Header component

export default function TasksScreen({ navigation }) {
  const { t } = useTranslation();
  
  // Sample task data
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Install drywall', status: 'Pending', openPhotos: [], completedPhotos: [], receipt: null, showPhotos: false },
    { id: '2', title: 'Paint living room', status: 'Pending', openPhotos: [], completedPhotos: [], receipt: null, showPhotos: false },
    { id: '3', title: 'Fix plumbing in bathroom', status: 'Completed', openPhotos: [], completedPhotos: [], receipt: null, showPhotos: false },
  ]);

  // Store the current tab (Open or Completed)
  const [currentTab, setCurrentTab] = useState('Open');

  // Toggle task status between Pending and Completed
  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' }
          : task
      )
    );
  };

  // Show or hide photos on task
  const togglePhotosVisibility = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, showPhotos: !task.showPhotos }
          : task
      )
    );
  };

  // Upload a photo for open tasks
  const uploadOpenPhoto = async (taskId) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? { ...task, openPhotos: [...task.openPhotos, result.assets[0].uri] }
            : task
        )
      );
    }
  };
  const uploadCompletedPhoto = async (taskId) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? { ...task, completedPhotos: [...task.completedPhotos, result.assets[0].uri] }
            : task
        )
      );
    }
  };
  // Upload a photo for completed tasks
  const takeOpenPhoto = async (taskId) => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false, // Disable cropping option
    });

    if (!result.canceled) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? { ...task, openPhotos: [...task.openPhotos, result.assets[0].uri] }
            : task
        )
      );
    }
  };
  const takeCompletedPhoto = async (taskId) => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false, // Disable cropping option
    });

    if (!result.canceled) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? { ...task, completedPhotos: [...task.completedPhotos, result.assets[0].uri] }
            : task
        )
      );
    }
  };
  // Render individual task with photo galleries and toggling between Open/Completed
  const renderTask = ({ item }) => {
    const isOpenTab = currentTab === 'Open';

    return (
      <View style={[styles.task, item.status === 'Completed' && styles.completedTask]}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskStatus}>{t(item.status.toLowerCase())}</Text>

        <View style={styles.taskActions}>
          {/* Status Toggle Button */}
          <TouchableOpacity onPress={() => toggleTaskStatus(item.id)} style={styles.statusButton}>
            <Text style={styles.statusButtonText}>
              {item.status === 'Pending' ? t('Mark as Completed') : t('Mark as Pending')}
            </Text>
          </TouchableOpacity>

          {/* Toggle Button for Open/Completed */}
         
         
          {/* Camera and Library icons on the right side of the toggle button */}
         
            <View style={styles.uploadIcons}>
            <TouchableOpacity onPress={() => togglePhotosVisibility(item.id)} style={styles.toggleButton}>
            <Ionicons name={item.showPhotos ? 'eye-off' : 'eye'} size={24} color="#007AFF" />
          </TouchableOpacity>
              {currentTab === 'Open' && (
                <>
                  <TouchableOpacity onPress={() => takeOpenPhoto(item.id)} style={styles.iconButton}>
            <Ionicons name="camera" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => uploadOpenPhoto(item.id)} style={styles.iconButton}>
            <Ionicons name="image" size={24} color="#007AFF" />
          </TouchableOpacity>
                </>
              )}
              {currentTab === 'Completed' && (
                <>
                  <TouchableOpacity onPress={() => takeCompletedPhoto(item.id)} style={styles.iconButton}>
                    <Ionicons name="camera" size={24} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => uploadCompletedPhoto(item.id)} style={styles.iconButton}>
                    <Ionicons name="image" size={24} color="#007AFF" />
                  </TouchableOpacity>
                </>
              )}
            </View>
         
        </View>

        {/* Tab to Toggle between Open and Completed Images */}
        {item.showPhotos && (
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, currentTab === 'Open' && styles.activeTab]}
              onPress={() => setCurrentTab('Open')}
            >
              <Text style={[styles.tabText, currentTab === 'Open' && styles.activeTabText]}>
                {t('Open')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, currentTab === 'Completed' && styles.activeTab]}
              onPress={() => setCurrentTab('Completed')}
            >
              <Text style={[styles.tabText, currentTab === 'Completed' && styles.activeTabText]}>
                {t('Completed')}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Render Open Photos */}
        {item.showPhotos && currentTab === 'Open' && item.openPhotos.length > 0 && (
          <FlatList
            data={item.openPhotos}
            horizontal
            renderItem={({ item: photo }) => (
              <Image source={{ uri: photo }} style={styles.photo} />
            )}
            keyExtractor={(photo, index) => `${item.id}-open-photo-${index}`}
          />
        )}

        {/* Render Completed Photos */}
        {item.showPhotos && currentTab === 'Completed' && item.completedPhotos.length > 0 && (
          <FlatList
            data={item.completedPhotos}
            horizontal
            renderItem={({ item: photo }) => (
              <Image source={{ uri: photo }} style={styles.photo} />
            )}
            keyExtractor={(photo, index) => `${item.id}-completed-photo-${index}`}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('Tasks')} />
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  list: {
    flex: 1,
    padding: 20,
  },
  task: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedTask: {
    backgroundColor: '#E8F5E9',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  taskStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  statusButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  toggleButton: {
    padding: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom:10,
    justifyContent: 'center',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#007AFF',
  },
  activeTabText: {
    color: 'white',
  },
  uploadIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-end",

  },
  iconButton: {
    padding: 0,
    marginHorizontal: 5,
  },
  photo: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});

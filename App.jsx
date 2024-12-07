import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
// import * as Notifications from 'expo-notifications';

import AuthScreen from './screens/AuthScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import TimeTrackingScreen from './screens/TimeTrackingScreen.jsx'; // You may not need this anymore
import TasksScreen from './screens/TasksScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import ReceiptUploadScreen from './screens/ReceiptUploadScreen.jsx'; // This is the updated screen
import LocationTrack from './screens/LocationTrack.jsx';
// import { registerForPushNotificationsAsync } from './utils/notifications.js';

import HomeIcon from './assets/icons/HomeIcon';
import FileUploadIcon from "./assets/icons/fileUploadIcon.js"
import BillIcon from './assets/icons/Billicon.js';
import TimeIcon from './assets/icons/TimeIcon';
import TasksIcon from './assets/icons/TasksIcon';
import ProfileIcon from './assets/icons/ProfileIcon';
import LocationTrackIcon from './assets/icons/LocationTrackIcon.js';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <HomeIcon color={color} size={size} />;
          } else if (route.name === 'ReceiptUpload') { // Updated tab for ReceiptUpload
            return <FileUploadIcon color={color} size={size} />; // Update icon as needed
          } else if (route.name === 'Tasks') {
            return <TasksIcon color={color} size={size} />;
          } else if (route.name === 'LocationTrack') {
            return <LocationTrackIcon color={color} size={size} />;
          }else if (route.name === 'Profile') {
            return <ProfileIcon color={color} size={size} />;
          }
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ReceiptUpload" component={ReceiptUploadScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="LocationTrack" component={LocationTrack}  />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   // Handle received notification
    // });

    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   // Handle notification response
    // });

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener.current);
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <Stack.Screen name="Auth">
              {props => <AuthScreen {...props} onLogin={() => setIsAuthenticated(true)} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Main" component={MainTabs} />
           
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
}
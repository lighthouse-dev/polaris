import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from 'firebase';

import LoginScreen from './src/screens/LoginScreen';
import TodoListScreen from './src/screens/TodoListScreen';
import ENV from './env.json';

require('firebase/firestore');

const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.FIREBASE_APPID,
  measurementId: ENV.FIREBASE_MEASUREMENT_ID
};
firebase.initializeApp(firebaseConfig);

const App = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    TodoListScreen: { screen: TodoListScreen }
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'Polaris',
      headerStyle: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        ...Platform.select({
          ios: {},
          android: {
            height: 60
          }
        })
      },
      headerTitleStyle: {
        color: '#333333',
        fontSize: 20,
        fontWeight: 'bold'
      },
      headerTintColor: '#FFF',
      headerBackTitle: null
    }
  }
);

export default createAppContainer(App);

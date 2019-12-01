import React from 'react';
import firebase from 'firebase';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import LoginScreen from './src/screens/LoginScreen';
import TodoListScreen from './src/screens/TodoListScreen';
import MemoListScreen from './src/screens/MemoListScreen';
import SignUpScreen from './src/screens/SignUpScreen';
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

const TabScreen = createMaterialTopTabNavigator(
  {
    TODO: { screen: TodoListScreen },
    MEMO: { screen: MemoListScreen }
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#333333',
      inactiveTintColor: '#333333',
      style: {
        backgroundColor: '#FFFFFF'
      },
      labelStyle: {
        textAlign: 'center',
        fontWeight: 'bold'
      },
      indicatorStyle: {
        borderBottomColor: '#3F52B5',
        borderBottomWidth: 2
      }
    }
  }
);

//making a StackNavigator to export as default
const App = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  SignUpScreen: { screen: SignUpScreen },
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3F52B5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2
      },
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
      },
      headerTintColor: '#FFFFFF',
      title: 'POLARIS',
      headerBackTitle: null
    }
  }
});
export default createAppContainer(App);

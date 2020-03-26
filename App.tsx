import React from 'react';
import firebase from 'firebase';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as theme } from '@eva-design/eva';

import LoginScreen from './src/screens/login/LoginScreen';
import TodoListScreen from './src/screens/todo/TodoListScreen';
import MemoListScreen from './src/screens/memo/MemoListScreen';
import MemoAddScreen from './src/screens/memo/MemoAddScreen';
import MemoEditScreen from './src/screens/memo/MemoEditScreen';
import MemoDetailScreen from './src/screens/memo/MemoDetailScreen';
import SignUpScreen from './src/screens/login/SignUpScreen';
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

// TODO: Redux化
// https://qiita.com/gonta616/items/278a7e81a8b624d9621e
// https://github.com/vkammerer/react-redux-firebase
// https://github.com/r-park/todo-react-redux
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
const StackNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  SignUpScreen: { screen: SignUpScreen },
  MemoListScreen: { screen: MemoListScreen },
  MemoAddScreen: {
    screen: MemoAddScreen,
    navigationOptions: {
      title: '新規メモ追加'
    }
  },
  MemoEditScreen: {
    screen: MemoEditScreen,
    navigationOptions: {
      title: ''
    }
  },
  MemoDetailScreen: {
    screen: MemoDetailScreen,
    navigationOptions: {
      title: ''
    }
  },
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
        flexGrow: 1,
        textAlign: 'center',
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
      },
      headerTintColor: '#FFFFFF',
      title: 'POLARIS',
      headerBackTitle: null
      // TODO: システム設定アイコン配置
      // headerRight: <OverflowMenuItem />
    }
  }
});

const AppContainer = createAppContainer(StackNavigator);

const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <AppContainer />
    </ApplicationProvider>
  </React.Fragment>
);

export default App;

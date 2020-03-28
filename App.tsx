import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as theme } from '@eva-design/eva';

import LoginScreen from './src/screens/login/LoginScreen';
import TodoListScreen from './src/screens/todo/TodoListScreen';
import TodoDetailScreen from './src/screens/todo/TodoDetailScreen';
import MemoListScreen from './src/screens/memo/MemoListScreen';
import MemoAddScreen from './src/screens/memo/MemoAddScreen';
import MemoEditScreen from './src/screens/memo/MemoEditScreen';
import MemoDetailScreen from './src/screens/memo/MemoDetailScreen';
import SignUpScreen from './src/screens/login/SignUpScreen';

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
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 7 // Android用Shadow
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
  TodoDetailScreen: { screen: TodoDetailScreen },
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
        backgroundColor: '#3F52B5'
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

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './src/screens/LoginScreen';

const App = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen }
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'Polaris',
      headerStyle: {
        backgroundColor: '#3F52B5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2
      },
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
      },
      headerTintColor: '#FFF',
      headerBackTitle: null
    }
  }
);

export default createAppContainer(App);

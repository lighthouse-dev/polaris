import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { initFirebase } from '../../utils/firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import Loading from '../../elements/Loading';

// TODO: ログイン、会員登録画面「ui-kitten」に合わせてデザイン修正
class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: true
  };

  async componentDidMount() {
    // 画面がレンダリングされた後に実行する
    const email = await SecureStore.getItemAsync('email');
    const password = await SecureStore.getItemAsync('password');

    if (email == null || password == null) {
      this.setState({ isLoading: false });
    }

    initFirebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ isLoading: false });
        this.navigateToHome();
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  navigateToHome() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'TabScreen' })]
    });

    this.props.navigation.dispatch(resetAction);
  }

  handleSubmit() {
    initFirebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        SecureStore.setItemAsync('email', this.state.email);
        SecureStore.setItemAsync('password', this.state.password);
        this.navigateToHome();
      })
      .catch(() => {});
  }

  handlePress() {
    this.props.navigation.navigate('SignUpScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading text="Loading..." isLoading={this.state.isLoading} />
        <Text style={styles.title}> POLARIS </Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={text => {
            this.setState({ email: text });
          }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={text => {
            this.setState({ password: text });
          }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry
          underlineColorAndroid="transparent"
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#3c4a8c"
        >
          <Text style={styles.buttonTitle}>Login</Text>
        </TouchableHighlight>

        <TouchableOpacity
          style={styles.signup}
          onPress={this.handlePress.bind(this)}
        >
          <Text style={styles.signupText}> ➕ Create account </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: '50%',
    padding: 24,
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 35,
    alignSelf: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#fafafa',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15
  },
  button: {
    backgroundColor: '#3F52B5',
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '70%'
  },
  buttonTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  signup: {
    alignSelf: 'center',
    marginTop: 20
  },
  signupText: {
    fontSize: 16
  }
});

export default LoginScreen;

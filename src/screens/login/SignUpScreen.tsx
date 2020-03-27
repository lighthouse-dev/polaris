import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import ValidationText from '../../elements/ValidationText';
import firebase from '../../utils/firebase';

class SignUpScreen extends React.Component {
  state = {
    email: '',
    password: '',
    passwordConfirm: '',
    isFormVaild: true,
    validationMessege: ''
  };

  handleSubmit() {
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ isFormVaild: false });
      this.setState({ validationMessege: 'Passwords do not match' });
      return false;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'TabScreen' })]
        });

        this.props.navigation.dispatch(resetAction);
      })
      .catch(err => {
        this.setState({ isFormVaild: false });
        this.setState({ validationMessege: err.message });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Sign up </Text>
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
        <TextInput
          style={styles.input}
          value={this.state.passwordConfirm}
          onChangeText={text => {
            this.setState({ passwordConfirm: text });
          }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password confirm"
          secureTextEntry
          underlineColorAndroid="transparent"
        />
        {!this.state.isFormVaild && (
          <ValidationText
            messege={this.state.validationMessege}
            style={styles.validationText}
          />
        )}
        <TouchableHighlight
          style={styles.button}
          underlayColor="#c93467"
          onPress={this.handleSubmit.bind(this)}
        >
          <Text style={styles.buttonTitle}> Create account </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
  validationText: {
    paddingLeft: 10,
    paddingBottom: 30,
    color: 'red'
  }
});

export default SignUpScreen;

import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { Auth } from '../App';
import * as backend from './Backend';

export interface Props {
  onAuth: (auth: Auth) => void;
}

const Login: React.FC<Props> = ({ onAuth }) => {
  const [user, setUser] = useState('');

  async function login() {
    let backendToken = await backend.login(user);
    let feedCredentials = await backend.getFeedToken(backendToken);
    let chatCredentials = await backend.getChatToken(backendToken);

    onAuth({
      user,
      backendToken,
      feedCredentials,
      chatCredentials,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={setUser}
          defaultValue={user}
          autoCapitalize="none"
        />
      </View>
      <Button title="Login" onPress={login}/>
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: '25%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  textInputContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#dddddd',
    borderWidth: 1,
    marginBottom: '5%',
  },
  textInput: {
    flex: 1,
    height: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 10,
    minHeight: '3%',
  },
});

export default Login;

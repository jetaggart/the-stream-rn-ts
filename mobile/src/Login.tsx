import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {User} from '../App';

export interface Props {
  onAuth: (user: User) => void;
}

const Login: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor="#abbabb"
        />
      </View>
      <Button
        title="Login"
        onPress={() => props.onAuth({backendToken: 'hello 123'})}
      />
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    marginTop: '15%',
    fontSize: 20,
    color: 'red',
    paddingBottom: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingRight: 10,
    paddingBottom: 10,
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

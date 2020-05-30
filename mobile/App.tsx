import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/Login';
import Main from './src/Main';
import {useState} from 'react';
import { ChatCredentials, FeedCredentials } from "./src/Backend";

declare const global: {HermesInternal: null | {}};

export type Auth = {
  user: string;
  backendToken: string;
  feedCredentials: FeedCredentials;
  chatCredentials: ChatCredentials;
};

export type AuthState = Auth | null;

const Stack = createStackNavigator();

function App() {
  const [authState, setAuthState] = useState<AuthState>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {(props) => (
            <Login
              {...props}
              onAuth={(as) => {
                console.log("as", as);
                setAuthState(as);
                props.navigation.replace('Main');
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Main" options={{title: 'The Stream'}}>
          {(props) => <Main {...props} user={authState!} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

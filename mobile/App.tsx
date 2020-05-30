import * as React from 'react';
import { Context, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Login';
import Main from './src/Main';
import { ChatCredentials, FeedCredentials } from "./src/Backend";

declare const global: { HermesInternal: null | {} };

export type Auth = {
  user: string;
  backendToken: string;
  feedCredentials: FeedCredentials;
  chatCredentials: ChatCredentials;
};

export type AuthState = Auth | null;

const Stack = createStackNavigator();

export const AuthContext = React.createContext<Auth>(undefined!)

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
        <Stack.Screen name="Main" options={{ title: 'The Stream' }}>
          {(props) =>
            <AuthContext.Provider value={authState!}>
              <Main {...props} />
            </AuthContext.Provider>
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Login';
import Main from './src/Main';
// @ts-ignore
import { StreamApp } from 'react-native-activity-feed'
import { ChatCredentials, FeedCredentials } from "./src/Backend";

export type Auth = {
  user: string;
  backendToken: string;
  feedCredentials: FeedCredentials;
  chatCredentials: ChatCredentials;
};

export type AuthState = Auth | null;

const Stack = createStackNavigator();

export const AuthContext = React.createContext<Auth>(undefined!)
export const StreamClientContext = React.createContext<any>(undefined!)

function App() {
  const [authState, setAuthState] = useState<AuthState>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ title: 'The Stream' }}>
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
              <StreamApp
                apiKey={authState?.feedCredentials.apiKey}
                appId={authState?.feedCredentials.appId}
                userId={authState?.user}
                token={authState?.feedCredentials.token}>
                <StreamApp.Consumer>
                  {(context: any) => (
                    <StreamClientContext.Provider value={context.client}>
                      <Main {...props} />
                    </StreamClientContext.Provider>
                  )}
                </StreamApp.Consumer>
              </StreamApp>
            </AuthContext.Provider>
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

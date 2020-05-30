import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons'
import Timeline from "./Timeline";

const Tab = createBottomTabNavigator();

export interface Props {
}

const Main: React.FC<Props> = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Timeline') {
            iconName = 'list'
          } else if (route.name === 'Messages') {
            iconName = 'musical-note'
          }

          return <Icon name={iconName} size={size} color={color}/>;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Timeline" component={Timeline}/>
      <Tab.Screen name="Messages">
        {props => <Text>Messages</Text>}
      </Tab.Screen>
    </Tab.Navigator>);
};

export default Main;

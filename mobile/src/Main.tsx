import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons'
import Timeline from "./Timeline";
import People from "./People";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

const Main: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Timeline') {
            iconName = 'list'
          } else if (route.name === 'People') {
            iconName = 'people'
          } else if (route.name === 'Profile') {
            iconName = 'person'
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
      <Tab.Screen name="Profile" component={Profile}/>
      <Tab.Screen name="People" component={People}/>
    </Tab.Navigator>);
};

export default Main;

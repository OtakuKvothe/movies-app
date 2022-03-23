import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './tabs/home';
import SearchTab from './tabs/search';
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'ios-search' : 'ios-search-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          'tabBarActiveTintColor': 'tomato',
          'tabBarInactiveTintColor': 'gray',
          'tabBarLabelPosition': 'below-icon',
          'tabBarStyle': [
            {
              'display': 'flex'
            },
            null
          ],
        })}
      >

        <Tab.Screen name='Home' options={{ headerShown: false }} component={HomeTab} />
        <Tab.Screen name='Search' options={{ headerShown: false }} component={SearchTab} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}


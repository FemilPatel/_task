// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Screen1 from "./src/Screen1";
import Screen2 from "./src/Screen2";
import Screen3 from "./src/Screen3";
import Login from "./src/Login";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={Screen1} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

function HomeStackScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "ios-location" : "ios-location-outline";
          } else if (route.name === "Detail") {
            iconName = focused ? "list-circle" : "list-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={Screen1} />
      <Tab.Screen name="Map" component={Screen2} />
      <Tab.Screen name="Detail" component={Screen3} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

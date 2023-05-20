import React from "react";

import { createStackNavigator } from "@react-navigation/native-stack";

import NestedScreen from "./src/NestedScreen";
import Screen1 from "./src/Screen1";
import Screen2 from "./src/Screen2";
import Screen3 from "./src/Screen3";

const Stack = createStackNavigator();

const FirstScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen name="NestedScreen1" component={NestedScreen} />
    </Stack.Navigator>
  );
};

export { FirstScreenNavigator };

const SecondScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen2" component={Screen2} />
      <Stack.Screen name="NestedScreen2" component={NestedScreen} />
    </Stack.Navigator>
  );
};

export { SecondScreenNavigator };

const ThirdScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen3" component={Screen3} />
      <Stack.Screen name="NestedScreen3" component={NestedScreen} />
    </Stack.Navigator>
  );
};

export { ThirdScreenNavigator };

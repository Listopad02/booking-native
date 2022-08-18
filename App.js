import React, { useState } from "react";
import { Button, Text, View, TextInput, ScrollView } from "react-native";
import StartScreen from "./Component/StartScreen";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Biliards from "./Component/Biliards";
import Karaoke from "./Component/Karaoke";
import Playstation from "./Component/playstation";

import Confirm from "./Component/Confirm";
import Success from "./Component/Success";
import Cancel from "./Component/Cancel"
import { store } from './redux/store'
import {Provider} from "react-redux";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Provider store={store}>
              <NavigationContainer>

                  <Stack.Navigator
                      screenOptions={{
                        headerShown: false
                      }}
                  >
                      {/* <View style={{ backgroundColor: '#222' }}> */}
                          <Stack.Screen name='Home' component={StartScreen} />
                          <Stack.Screen name='billiards' component={Biliards} />
                          <Stack.Screen name='karaoke' component={Karaoke} />
                          <Stack.Screen name='playstation' component={Playstation} />
                          <Stack.Screen name='confirm' component={Confirm} />
                          <Stack.Screen name='success' component={Success} />
                          <Stack.Screen name='cancel' component={Cancel} />
                      {/* </View> */}
                  </Stack.Navigator>

              </NavigationContainer>

      </Provider>
  )
}

export default App;
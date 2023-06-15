import React from 'react';
import { StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from '@react-native-material/core';
import InsuranceScreen from './src/screens/InsuranceScreen';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AboutUs from './src/screens/AboutUs';
const Stack = createStackNavigator();

const App = () => {
  StatusBar.setBackgroundColor('white');
  if (Platform.OS === 'android') {
    StatusBar.setBarStyle('dark-content');
  }
  return (
    <Provider>
      <StatusBar backgroundColor={'white'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="হোম">
          <Stack.Screen
            options={{
              headerShown : false,
              headerTitleAlign: 'center',
              ...TransitionPresets.SlideFromRightIOS,
            }}
            name="হোম"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: 'center',
              ...TransitionPresets.SlideFromRightIOS,
            }}
            name="আমাদের সম্পর্কে"
            component={AboutUs}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: 'center',
              ...TransitionPresets.SlideFromRightIOS,
            }}
            name="মোটর সাইকেল"
            component={InsuranceScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: 'center',
              ...TransitionPresets.SlideFromRightIOS,
            }}
            name="গাড়ী"
            component={InsuranceScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: 'center',
              ...TransitionPresets.SlideFromRightIOS,
            }}
            name="অন্যান্য"
            component={InsuranceScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

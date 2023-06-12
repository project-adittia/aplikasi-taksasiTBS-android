import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from './src/page/splashscreen.js';
import StartPages from './src/page/StartPage.js';
import Auth from './src/screenstack/auth.js';
import UserStack from './src/screenstack/userstack.js';
import AdminStack from './src/screenstack/adminstack.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="StartPage" component={StartPages} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="UserStack" component={UserStack} />
        <Stack.Screen name="AdminStack" component={AdminStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

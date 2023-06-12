/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UserPage from '../page/UserPages';
import FormTaksasi from '../page/PageTaksasi';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserPage" component={UserPage} />
      <Stack.Screen name="FormTaksasi" component={FormTaksasi} />
    </Stack.Navigator>
  );
};

export default UserStack;

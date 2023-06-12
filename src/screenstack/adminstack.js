/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AdminPage from '../page/AdminPage';
import ResultPage from '../page/ResultPage';

const Stack = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AdminPage" component={AdminPage} />
      <Stack.Screen name="ResultPage" component={ResultPage} />
    </Stack.Navigator>
  );
};

export default AdminStack;

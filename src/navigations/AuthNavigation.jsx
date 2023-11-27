import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from 'constants/screens';
import Login from 'screens/Auth/Login';

const AuthNavigationStack = createNativeStackNavigator();
const Stack = [{name: screens.AUTH.LOGIN, component: Login}];

const AuthNavigation = () => {
  return (
    <AuthNavigationStack.Navigator
      initialRouteName={screens.AUTH.LOGIN}
      screenOptions={{headerShown: false, animation: 'none'}}>
      {Stack.map(({name, component, screenOptions}) => (
        <AuthNavigationStack.Screen
          key={name}
          name={name}
          component={component}
          options={screenOptions ? screenOptions : {}}
        />
      ))}
    </AuthNavigationStack.Navigator>
  );
};

export default AuthNavigation;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from 'constants/screens';
import Home from 'screens/App/Home';

const AppNavigationStack = createNativeStackNavigator();
const Stack = [{name: screens.APP.HOME, component: Home}];

const AppNavigation = () => {
  return (
    <>
      <AppNavigationStack.Navigator
        initialRouteName={screens.APP.HOME}
        screenOptions={{headerShown: false, animation: 'none'}}>
        {Stack.map(({name, component, screenOptions}) => (
          <AppNavigationStack.Screen
            key={name}
            name={name}
            component={component}
            options={screenOptions ? screenOptions : {}}
          />
        ))}
      </AppNavigationStack.Navigator>
    </>
  );
};

export default AppNavigation;

import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import {navigators} from 'constants/screens';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const RootNavigationStack = createNativeStackNavigator();
const Stack = [
  {name: navigators.AUTH, component: AuthNavigation},
  {name: navigators.APP, component: AppNavigation},
];
const RootNavigation = () => {
  return (
    <RootNavigationStack.Navigator
      initialRouteName={navigators.AUTH}
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      {Stack.map(({name, component, screenOptions}) => (
        <RootNavigationStack.Screen
          key={name}
          name={name}
          component={component}
          options={screenOptions ? screenOptions : {}}
        />
      ))}
    </RootNavigationStack.Navigator>
  );
};

export default RootNavigation;

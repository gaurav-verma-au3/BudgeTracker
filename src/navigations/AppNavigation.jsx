import React, {useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from 'constants/screens';
import Home from 'screens/App/Home';
import Tabbar from '../components/TabBar/TabBar';
import {Text, View} from 'react-native';
import AccountsDrawer from '../components/AccountsDrawer';
import TransactionsDrawer from '../components/TransactionsDrawer';
import TransfersDrawer from '../components/TransfersDrawer';
import ColorPicker from '../components/ColorPicker';
import useTheme from '../hooks/useTheme';
import {useDispatch} from 'react-redux';
import {openTransactionsDrawer} from '../redux/drawersStatus';
import Icon from 'react-native-vector-icons/FontAwesome6';

import MI from 'react-native-vector-icons/MaterialIcons';
import AddButton from '../components/Buttons/AddButton';
import {normalize} from '../utils/normalize';
import {height} from '../utils/device';

const AppNavigationStack = createNativeStackNavigator();
const Stack = [{name: screens.APP.HOME, component: Home}];

const AppNavigation = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const childRef = useRef();
  const dispatch = useDispatch();

  const handleOpenTransactions = () => {
    dispatch(openTransactionsDrawer());
  };

  const handlePress = () => {
    if (expanded) {
      childRef.current.impeerativeCollapseHandle('collapse');
    } else {
      handleOpenTransactions();
    }
  };
  const handleLongPress = () => {
    if (expanded) {
      childRef.current.impeerativeCollapseHandle('collapse');
    } else {
      childRef.current.impeerativeCollapseHandle('expand');
    }
  };

  const tabs = [
    {
      name: 'list',
      activeIcon: (
        <Icon name="list-ul" color={theme.colors.loginText} size={25} />
      ),
      inactiveIcon: (
        <Icon name="list-ul" color={theme.colors.loginText} size={25} />
      ),
    },
    {
      name: 'Home',
      activeIcon: (
        <AddButton
          ref={childRef}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ),
      inactiveIcon: <MI name="add" color={theme.colors.loginText} size={25} />,
      onPress: handlePress,
      onLongPress: handleLongPress,
    },
    {
      name: 'camera',
      activeIcon: (
        <MI name="settings" color={theme.colors.loginText} size={25} />
      ),
      inactiveIcon: (
        <MI name="settings" color={theme.colors.loginText} size={25} />
      ),
    },
  ];
  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: height - normalize(90),
        }}>
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
      </View>
      <Tabbar
        tabs={tabs}
        tabBarContainerBackground={theme.colors.primary}
        defaultActiveTabIndex={1}
        transitionSpeed={100}
        tabBarBackground={theme.colors.loginText}
        activeTabBackground={theme.colors.primary}
        labelStyle={{
          color: theme.colors.loginText,
          fontWeight: '600',
          fontSize: normalize(15),
        }}
        // onTabChange={tab => console.log({tab})}
      />
      <AccountsDrawer />
      <TransactionsDrawer />
      <TransfersDrawer />
      <ColorPicker />
    </>
  );
};

export default AppNavigation;

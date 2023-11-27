/* eslint-disable react-native/no-inline-styles */
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {Provider} from 'react-redux';
import {store} from 'redux/store';
import {
  Linking,
  LogBox,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import useTheme from 'hooks/useTheme';
import {ThemeProvider} from 'styled-components';
import {statusBarColor} from 'constants/statusBarColor';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {normalize} from 'utils/normalize';
import {useFlipper} from '@react-navigation/devtools';
import {logo} from 'assets/images';
import RootNavigation from 'navigations/RootNavigation';
import {useRealmContext} from 'database';
import RealmDebugger from 'components/RealmDebugger';
import {ToastProvider} from 'react-native-toast-notifications';
import {PaperProvider} from 'react-native-paper';
export const ScreenNameContext = createContext(null);

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isReadyRef = useRef();
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState('LOGIN');
  const {RealmProvider} = useRealmContext();
  const theme = useTheme();
  LogBox.ignoreLogs([
    'ReactImageView:',
    'Sending `onAnimatedValueUpdate` with no listeners registered.',
    'Non-serializable values were found in the navigation state',
    'Module Leaflet requires main queue setup since it overrides',
    'BSON: For React Native please polyfill crypto.getRandomValues',
  ]); // Ignore

  useEffect(() => {
    const timeOut = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timeOut);
  }, []);

  const linking = {
    prefixes: ['bug=dgetracker://'],
    config: {
      screens: {
        // [navigators.APP]: {
        //   initialRouteName: screens.APP.HOME,
        //   screens: {
        //     [screens.APP.SMS_THREADS]: {
        //       path: 'SMS_THREADS/:phoneNumber',
        //       parse: {
        //         id: Number,
        //       },
        //     },
        //   },
        // },
      },
    },
    async getInitialURL() {
      const url = await Linking.getInitialURL();
      if (url) {
        let interval = setInterval(() => {
          if (isReadyRef.current) {
            Linking.openURL(url);
            if (interval) {
              clearInterval(interval);
            }
          }
        }, 100);
      }
      return url;
    },
  };

  useFlipper(navigationRef);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      logoImage={logo}
      backgroundColor={theme.colors.primary}
      logoHeight={normalize(120)}
      logoWidth={normalize(120)}>
      <ToastProvider>
        <RealmProvider>
          <RealmDebugger />
          <ScreenNameContext.Provider value={currentRoute}>
            <ThemeProvider theme={theme}>
              <Provider store={store}>
                <PaperProvider theme={theme}>
                  <SafeAreaProvider>
                    <View
                      style={{
                        flex: 1,
                        paddingTop:
                          Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
                        backgroundColor:
                          statusBarColor(theme)[currentRoute]?.color ||
                          '#e3e3e3',
                      }}>
                      <SafeAreaView
                        style={{
                          flex: 0,
                          backgroundColor:
                            statusBarColor(theme)[currentRoute]?.color ||
                            '#e3e3e3',
                        }}
                      />
                      <StatusBar
                        barStyle={
                          statusBarColor(theme)[currentRoute]?.contentStyle ||
                          'dark-content'
                        }
                        backgroundColor={
                          statusBarColor(theme)[currentRoute]?.color ||
                          '#e3e3e3'
                        }
                      />

                      <NavigationContainer
                        fallback={<Text>Loading...</Text>}
                        linking={linking}
                        ref={navigationRef}
                        onReady={() => {
                          isReadyRef.current = true;
                          setCurrentRoute(navigationRef.getCurrentRoute().name);
                        }}
                        onStateChange={async () => {
                          setCurrentRoute(navigationRef.getCurrentRoute().name);
                        }}>
                        <RootNavigation navigationRef={navigationRef} />
                      </NavigationContainer>
                    </View>
                  </SafeAreaProvider>
                </PaperProvider>
              </Provider>
            </ThemeProvider>
          </ScreenNameContext.Provider>
        </RealmProvider>
      </ToastProvider>
    </AnimatedSplash>
  );
};

export default App;

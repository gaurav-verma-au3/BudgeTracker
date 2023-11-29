import {darkTheme, lightTheme} from 'constants/theme';
import {useColorScheme} from 'react-native';
import {useSelector} from 'react-redux';
const useTheme = () => {
  const themeColor = useSelector(state => state.themeColor);
  const colorScheme = useColorScheme();
  return colorScheme === 'light'
    ? {
        ...lightTheme,
        colors: {
          ...lightTheme.colors,
          primary: themeColor ? themeColor : lightTheme.colors.primary,
        },
        colorScheme,
        contentStyle: 'dark-content',
      }
    : colorScheme === 'dark'
    ? {
        ...darkTheme,
        colors: {
          ...darkTheme.colors,
          primary: themeColor ? themeColor : darkTheme.colors.primary,
        },
        colorScheme,
        contentStyle: 'light-content',
      }
    : {
        ...lightTheme,
        colors: {
          ...lightTheme.colors,
          primary: themeColor ? themeColor : lightTheme.colors.primary,
        },
        colorScheme,
        contentStyle: 'dark-content',
      };
};

export default useTheme;

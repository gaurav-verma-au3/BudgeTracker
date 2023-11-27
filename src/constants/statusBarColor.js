import {screens} from './screens';

// TODO fix constant theme usage

const LOGIN = t => ({
  color: t.colors.primary,
  contentStyle: 'light-content' || t.contentStyle,
});

const HOME = t => ({
  color: t.colors.loginText,
  contentStyle: 'dark-content' || t.contentStyle,
});

export const statusBarColor = t => ({
  [screens.AUTH.LOGIN]: LOGIN(t),
  [screens.APP.HOME]: HOME(t),
});

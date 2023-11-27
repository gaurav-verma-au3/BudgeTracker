import {Platform} from 'react-native';
import {normalScale, normalize, verticalScale} from 'utils/normalize';

const common = {
  fontWeight: {
    w300: '300',
    w200: '200',
    w400: '400',
    w500: '500',
    w600: '600',
    w700: '700',
    w800: '800',
    w900: '900',
  },
  fontSize: {
    f12: normalize(12),
    f13: normalize(13),
    f14: normalize(14),
    f15: normalize(15),
    f16: normalize(16),
    f17: normalize(17),
    f18: normalize(18),
    f19: normalize(19),
    f20: normalize(20),
    f24: normalize(24),
    f26: normalize(26),
    f28: normalize(28),
    f30: normalize(30),
    f32: normalize(32),
    f34: normalize(34),
    f36: normalize(36),
  },
  // contentStyle : dark-content, light-content
  fontFamily: Platform.OS === 'ios' ? 'san Francisco' : 'Roboto',
  spacings: {
    normalScale: {
      s12: normalScale(12),
      s15: normalScale(15),
      s16: normalScale(16),
      s18: normalScale(18),
      s24: normalScale(24),
      s36: normalScale(36),
      s42: normalScale(42),
    },
    verticalScale: {
      s4: verticalScale(4),
      s12: verticalScale(12),
      s15: verticalScale(15),
      s16: verticalScale(16),
      s18: verticalScale(18),
      s24: verticalScale(24),
      s36: verticalScale(36),
      s42: verticalScale(42),
    },
  },
};
export const darkTheme = {
  colors: {
    primary: '#7F3DFF',
    loginText: '#FCFCFC',
    black: '#000000',
    white: '#ffffff',
  },
  ...common,
};
export const lightTheme = {
  colors: {
    primary: '#7F3DFF',
    loginText: '#FCFCFC',
    black: '#000000',
    white: '#ffffff',
  },
  ...common,
};

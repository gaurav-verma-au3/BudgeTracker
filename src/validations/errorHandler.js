import {darkTheme} from 'constants/theme';
import {dispatchSnackBar} from '../utils/snackbar';
export const handleValidationError = (isInvalid, body) => {
  const errors = Object.values(isInvalid);
  const success = errors.length ? false : true;
  if (!success) {
    dispatchSnackBar({
      text: errors[0],
      color: darkTheme.colors.error,
    });
  }
  const result = success ? body : isInvalid;
  return {result, success};
};

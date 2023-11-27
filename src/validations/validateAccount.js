import {stringLiteral, formatAmount} from 'utils/utilities';
import {handleValidationError} from './errorHandler';
import {checkByLength, validateAmount} from './validators';

export const validateAccount = (type, name, currentBalance) => {
  const isInvalid = {};
  const body = {};
  if (checkByLength(type)) {
    body.type = stringLiteral(type);
  } else {
    isInvalid.type = 'Invalid Type';
  }
  if (checkByLength(name)) {
    body.name = stringLiteral(name);
  } else {
    isInvalid.name = 'Invalid Name';
  }
  if (validateAmount(currentBalance)) {
    body.currentBalance = formatAmount(currentBalance);
  } else {
    isInvalid.currentBalance = 'Invalid Current Balance';
  }
  return handleValidationError(isInvalid, body);
};

import {stringLiteral, formatAmount} from 'utils/utilities';
import {handleValidationError} from './errorHandler';
import {checkByLength, validateAmount, validateObjectId} from './validators';

export const validateTransfer = (amount, source_ac, destination_ac, date) => {
  const isInvalid = {};
  const body = {};

  if (validateAmount(amount)) {
    body.amount = formatAmount(amount);
  } else {
    isInvalid.amount = 'Invalid Amount';
  }
  if (new Date(date).getTime() > 0) {
    body.date = date;
  } else {
    isInvalid.date = 'Invalid Date';
  }
  if (validateObjectId(source_ac)) {
    body.source_ac = source_ac;
  } else {
    isInvalid.source_ac = 'Invalid Source Account';
  }
  if (validateObjectId(destination_ac)) {
    body.destination_ac = destination_ac;
  } else {
    isInvalid.destination_ac = 'Invalid Destination Account';
  }

  return handleValidationError(isInvalid, body);
};

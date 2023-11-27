import {stringLiteral, formatAmount} from 'utils/utilities';
import {handleValidationError} from './errorHandler';
import {checkByLength, validateAmount, validateObjectId} from './validators';

export const validateTransaction = (
  type,
  summary,
  description,
  amount,
  date,
  accountId,
) => {
  const isInvalid = {};
  const body = {};
  if (checkByLength(type)) {
    body.type = stringLiteral(type);
  } else {
    isInvalid.type = 'Invalid Type';
  }
  if (checkByLength(summary)) {
    body.summary = stringLiteral(summary);
  } else {
    isInvalid.summary = 'Invalid Summary';
  }
  if (checkByLength(description)) {
    body.description = stringLiteral(description);
  } else {
    isInvalid.description = 'Invalid Description';
  }
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
  if (validateObjectId(accountId)) {
    body.accountId = accountId;
  } else {
    isInvalid.accountId = 'Invalid Account Selected';
  }

  return handleValidationError(isInvalid, body);
};

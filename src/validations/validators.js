import Realm from 'realm';
import {formatAmount} from '../utils/utilities';

export const validateAmount = amount =>
  amount &&
  amount.length &&
  (formatAmount(amount) <= 0 || formatAmount(amount) >= 0);

export const validateObjectId = o => Realm.BSON.ObjectId.isValid(o);

export const checkByLength = o => o && o.length;

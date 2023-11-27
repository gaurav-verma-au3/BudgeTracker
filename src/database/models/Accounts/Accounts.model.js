import {Realm} from '@realm/react';
import {tableNames} from 'database/tableNames';
import {formatAmount} from 'utils/utilities';

export default class extends Realm.Object {
  static schema = {
    name: tableNames.Accounts,
    properties: {
      _id: 'objectId',
      type: {type: 'string', indexed: 'full-text'},
      name: {type: 'string', indexed: 'full-text'},
      currentBalance: {type: 'double'},
    },
  };
  static generate(account) {
    const {type, name, currentBalance = 0} = account;
    return {
      _id: new Realm.BSON.ObjectId(),
      type,
      name,
      currentBalance: formatAmount(currentBalance),
    };
  }
}

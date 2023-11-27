import {Realm} from '@realm/react';
import {tableNames} from 'database/tableNames';
import {formatAmount} from 'utils/utilities';

export default class extends Realm.Object {
  static schema = {
    name: tableNames.Transactions,
    properties: {
      _id: 'objectId',
      type: {type: 'string', indexed: 'full-text'},
      summary: {type: 'string', indexed: 'full-text'},
      description: {type: 'string', indexed: 'full-text'},
      amount: {type: 'double'},
      date: {type: 'int'},
      accountId: {type: 'objectId'},
    },
  };
  static generate(transaction) {
    const {
      type,
      summary,
      description,
      amount = 0,
      date,
      accountId,
    } = transaction;
    return {
      _id: new Realm.BSON.ObjectId(),
      type,
      summary,
      description,
      amount: formatAmount(amount),
      date,
      accountId,
    };
  }
}

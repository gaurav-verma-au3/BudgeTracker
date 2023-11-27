import {Realm} from '@realm/react';
import {tableNames} from 'database/tableNames';
import {formatAmount} from 'utils/utilities';

export default class extends Realm.Object {
  static schema = {
    name: tableNames.Transfers,
    properties: {
      _id: 'objectId',
      amount: {type: 'double'},
      source_ac: {type: 'objectId'},
      destination_ac: {type: 'objectId'},
      date: {type: 'int'},
    },
  };
  static generate(transfer) {
    const {amount = 0, source_ac, destination_ac, date} = transfer;
    return {
      _id: new Realm.BSON.ObjectId(),
      amount: formatAmount(amount),
      source_ac,
      destination_ac,
      date,
    };
  }
}

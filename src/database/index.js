import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import AccountsModel from './models/Accounts/Accounts.model';
import TransactionsModel from './models/Transactions/Transactions.model';
import TransfersModel from './models/Transfers/Transfers.model';

const config = {
  schema: [AccountsModel, TransactionsModel, TransfersModel],
  schemaVersion: 1,
};

let realmInstance = new Realm(config);

let realm = () => {
  if (realmInstance.isClosed) {
    realmInstance = new Realm(config);
  }
  return realmInstance;
};

const realmContext = createRealmContext(realm);
const {RealmProvider, useObject, useQuery, useRealm} = realmContext;
export const useRealmContext = () => realmContext;

export {RealmProvider, realm, useObject, useQuery, useRealm};

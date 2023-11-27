import {realm} from 'database';
import {tableNames} from 'database/tableNames';
import AccountsModel from './Accounts.model';
import {TRANSACTION_TYPES_ENUM} from '../../../constants';
const realmInstance = realm();
const queryHandler = realmInstance.objects(tableNames.Accounts);

const addAccount = async account => {
  if (realmInstance)
    try {
      await realmInstance.write(() => {
        realmInstance.create(
          tableNames.Accounts,
          AccountsModel.generate(account),
          true,
        );
      });
      return true;
    } catch (error) {
      console.log({error, location: 'queries/addAccount'});
      return false;
    }
};

const transactAccount = async (_id, amount, type) => {
  if (realmInstance)
    try {
      const doc = queryHandler.filtered(`_id == $0`, _id)[0];
      console.log({_id, amount, type, doc});
      const result = await realmInstance.write(() => {
        doc.currentBalance =
          type === TRANSACTION_TYPES_ENUM.CREDIT
            ? doc.currentBalance + amount
            : doc.currentBalance - amount;
      });
      console.log({result: JSON.stringify(result)});
      return true;
    } catch (error) {
      console.log({error, location: 'queries/debitAccount'});
    }
};

export const AccountsQueries = {addAccount, transactAccount};

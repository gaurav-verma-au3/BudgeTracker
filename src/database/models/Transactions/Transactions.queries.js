import {realm} from 'database';
import {tableNames} from 'database/tableNames';
import TransactionsModel from './Transactions.model';
import {AccountsQueries} from '../Accounts/Accounts.queries';
const realmInstance = realm();
const queryHandler = realmInstance.objects(tableNames.Transactions);

const addTransaction = async transaction => {
  if (realmInstance)
    try {
      await realmInstance.write(() => {
        realmInstance.create(
          tableNames.Transactions,
          TransactionsModel.generate(transaction),
          true,
        );
      });
      const transactAccount = await AccountsQueries.transactAccount(
        transaction.accountId,
        transaction.amount,
        transaction.type,
      );
      return transactAccount;
    } catch (error) {
      console.log({error, location: 'queries/addTransaction'});
      return false;
    }
};

export const TransactionsQueries = {addTransaction};

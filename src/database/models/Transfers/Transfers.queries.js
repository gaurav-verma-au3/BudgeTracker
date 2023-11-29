import {realm} from 'database';
import {tableNames} from 'database/tableNames';
import TransfersModel from './Transfers.model';
import {TRANSACTION_TYPES_ENUM} from '../../../constants';
import {AccountsQueries} from '../Accounts/Accounts.queries';
const realmInstance = realm();
const queryHandler = realmInstance.objects(tableNames.Transfers);

const addTransfer = async transfer => {
  if (realmInstance)
    try {
      await realmInstance.write(() => {
        realmInstance.create(
          tableNames.Transfers,
          TransfersModel.generate(transfer),
          true,
        );
      });
      const transactAccountDebit = await AccountsQueries.transactAccount(
        transfer.source_ac,
        transfer.amount + transfer.charges,
        TRANSACTION_TYPES_ENUM.DEBIT,
      );
      const transactAccountCredit = await AccountsQueries.transactAccount(
        transfer.destination_ac,
        transfer.amount,
        TRANSACTION_TYPES_ENUM.CREDIT,
      );
      return transactAccountDebit && transactAccountCredit;
    } catch (error) {
      console.log({error, location: 'queries/addTransfer'});
      return false;
    }
};

export const TransfersQueries = {addTransfer};

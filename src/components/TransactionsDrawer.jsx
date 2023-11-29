import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeTransactionsDrawer,
  openAccountsDrawer,
} from '../redux/drawersStatus';
import useTheme from '../hooks/useTheme';
import NormalInput from './InputBoxes/NormalInput';
import Form from './Form';
import {Button} from './Buttons/Button';
import {MT} from '../styled/MT';
import DateTimePicker from './InputBoxes/DateTimePicker';
import {TransactionsSummaries, TransactionsTypes} from '../constants';
import {useQuery} from '../database';
import {tableNames} from '../database/tableNames';
import {dateString} from 'utils/date';
import {validateTransaction} from '../validations/validateTransaction';
import {dispatchSnackBar} from '../utils/snackbar';
import {TransactionsQueries} from '../database/models/Transactions/Transactions.queries';
import Loader from './Loader';
import Success from './Success';
import Chips from './Chips';

let typeValueKey = 'value';
let summaryValueKey = 'value';

let accountValueKey = '_id';

const TransactionsDrawer = () => {
  const theme = useTheme();
  const {transactionsDrawer} = useSelector(state => state.drawersStatus);
  const dispatch = useDispatch();
  const [type, setType] = useState({});
  const [summary, setSummary] = useState({});
  const [account, setAccount] = useState({});
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('0.00');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const accounts = useQuery(tableNames.Accounts);

  const handleCloseTransactionsDrawer = () => {
    dispatch(closeTransactionsDrawer());
  };

  const handleAddTransaction = async () => {
    try {
      setLoading(true);
      const {success, result} = validateTransaction(
        type.value,
        summary.value,
        description,
        amount,
        date.getTime(),
        account._id,
      );

      if (success) {
        const transaction = await TransactionsQueries.addTransaction(result);
        if (transaction) {
          setAdded(true);
          setLoading(false);
        } else {
          setLoading(false);
          dispatchSnackBar({text: `Ooops that wasn't supposed to happen!!!`});
        }
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      dispatchSnackBar({text: `Ooops that wasn't supposed to happen!!!`});
      console.log({err, location: 'TransactionsDrawer/handleAddTransaction'});
    }
  };
  const handleOpenAccountsDrawer = () => {
    dispatch(openAccountsDrawer());
  };

  const handleAmountFocus = e => {
    if (amount === '0.00') {
      setAmount('');
    }
  };
  const handleAmountBlur = e => {
    if (amount === '') {
      setAmount('0.00');
    }
  };

  useEffect(() => {
    setDate(new Date());
    setAccount({});
    setSummary({});
    setType({});
    setAmount('0.00');
  }, [transactionsDrawer]);

  useEffect(() => {
    console.log({added});
    let timeout;
    if (added) {
      timeout = setTimeout(() => {
        setAdded(false);
        handleCloseTransactionsDrawer();
      }, 2000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [added]);

  return (
    <Modal
      animationType="slide"
      visible={!!transactionsDrawer}
      transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1, width: '100%'}}
        onPress={handleCloseTransactionsDrawer}>
        <TouchableWithoutFeedback>
          <Form title={'Add Transaction'} heightPercentage={74}>
            {loading ? (
              <Loader />
            ) : added ? (
              <Success />
            ) : (
              <>
                <Chips
                  placeholder={'Transaction Type'}
                  selected={type}
                  onPress={setType}
                  valueField={typeValueKey}
                  items={TransactionsTypes}
                />
                <MT MT={theme.spacings.verticalScale.s4} />
                <Chips
                  placeholder={'Transaction Summary'}
                  selected={summary}
                  onPress={setSummary}
                  valueField={summaryValueKey}
                  items={TransactionsSummaries}
                />
                <MT MT={theme.spacings.verticalScale.s4} />
                <Chips
                  selected={account}
                  onPress={setAccount}
                  placeholder={'Source Account'}
                  emptyMessage={'No Accounts Add Now'}
                  onEmptyPress={handleOpenAccountsDrawer}
                  items={accounts.map(v => ({
                    ...v,
                    label: `${v.type}/${v.name}`,
                  }))}
                  valueField={accountValueKey}
                />
                <MT MT={theme.spacings.verticalScale.s4} />
                <NormalInput
                  placeholder="Amount"
                  onFocus={handleAmountFocus}
                  onBlur={handleAmountBlur}
                  inputMode="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />
                <MT MT={theme.spacings.verticalScale.s4} />
                <NormalInput
                  placeholder="Description"
                  value={description}
                  onChangeText={setDescription}
                />
                <MT MT={theme.spacings.verticalScale.s4} />
                <DateTimePicker
                  value={dateString(date.getTime())}
                  date={date}
                  mode="datetime"
                  placeholder="Date"
                  onChange={setDate}
                />
                <MT MT={theme.spacings.verticalScale.s16} />
                <Button variant={'solid'} onPress={handleAddTransaction}>
                  SUBMIT
                </Button>
              </>
            )}
          </Form>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default TransactionsDrawer;

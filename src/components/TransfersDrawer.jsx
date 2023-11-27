import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {closeTransfersDrawer} from '../redux/drawersStatus';
import Chips from './Chips';
import useTheme from '../hooks/useTheme';
import NormalInput from './InputBoxes/NormalInput';
import Form from './Form';
import {Button} from './Buttons/Button';
import {MT} from '../styled/MT';
import DateTimePicker from './InputBoxes/DateTimePicker';
import {useQuery} from '../database';
import {tableNames} from '../database/tableNames';
import {dateString} from 'utils/date';
import {dispatchSnackBar} from '../utils/snackbar';
import Loader from './Loader';
import Success from './Success';
import {validateTransfer} from '../validations/validateTransfer';
import {TransfersQueries} from '../database/models/Transfers/Transfers.queries';

let accountValueKey = '_id';

const TransfersDrawer = () => {
  const theme = useTheme();
  const {transfersDrawer} = useSelector(state => state.drawersStatus);
  const dispatch = useDispatch();
  const [source_ac, set_source_ac] = useState({});
  const [destination_ac, set_destination_ac] = useState({});
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const accounts = useQuery(tableNames.Accounts);

  const handleCloseTransfersDrawer = () => {
    dispatch(closeTransfersDrawer());
  };

  const handleAddTransfer = async () => {
    try {
      setLoading(true);
      const {success, result} = validateTransfer(
        amount,
        source_ac._id,
        destination_ac._id,
        date.getTime(),
      );
      if (success) {
        const transfer = await TransfersQueries.addTransfer(result);
        if (transfer) {
          setAdded(true);
          setLoading(false);
        } else {
          dispatchSnackBar({text: `Ooops that wasn't supposed to happen!!!`});
          setLoading(false);
        }
      }
    } catch (err) {
      setLoading(false);
      dispatchSnackBar({text: `Ooops that wasn't supposed to happen!!!`});
      console.log({err, location: 'TransfersDrawer/handleAddTransfer'});
    }
  };

  useEffect(() => {
    setDate(new Date());
    set_destination_ac({});
    set_source_ac({});
    setAmount('');
  }, [transfersDrawer]);

  useEffect(() => {
    let timeout;
    if (added) {
      timeout = setTimeout(() => {
        setAdded(false);
        handleCloseTransfersDrawer();
      }, 2000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [added]);

  return (
    <Modal animationType="slide" visible={!!transfersDrawer} transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1, width: '100%'}}
        onPress={handleCloseTransfersDrawer}>
        <TouchableWithoutFeedback>
          <Form title={'Add Transfer'} heightPercentage={60}>
            {loading ? (
              <Loader />
            ) : added ? (
              <Success />
            ) : (
              <>
                <Chips
                  selected={source_ac}
                  onPress={set_source_ac}
                  items={accounts.map(v => ({
                    ...v,
                    label: `${v.type}/${v.name}`,
                  }))}
                  valueField={accountValueKey}
                />
                <MT MT={theme.spacings.verticalScale.s4} />
                <Chips
                  selected={destination_ac}
                  onPress={set_destination_ac}
                  items={accounts.map(v => ({
                    ...v,
                    label: `${v.type}/${v.name}`,
                  }))}
                  valueField={accountValueKey}
                />
                <MT MT={theme.spacings.verticalScale.s4} />
                <NormalInput
                  placeholder="Amount"
                  inputMode="numeric"
                  value={amount}
                  onChangeText={setAmount}
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
                <Button variant={'solid'} onPress={handleAddTransfer}>
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

export default TransfersDrawer;

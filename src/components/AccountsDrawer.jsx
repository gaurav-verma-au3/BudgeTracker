import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {closeAccountsDrawer} from '../redux/drawersStatus';
import Form from './Form';
import useTheme from '../hooks/useTheme';
import Chips from './Chips';
import {MT} from '../styled/MT';
import NormalInput from './InputBoxes/NormalInput';
import {Button} from './Buttons/Button';
import {AccountTypes} from '../constants';
import {AccountsQueries} from '../database/models/Accounts/Accounts.queries';
import {validateAccount} from '../validations/validateAccount';
import Loader from './Loader';
import Success from './Success';
import {dispatchSnackBar} from '../utils/snackbar';
const AccountsDrawer = () => {
  const {accountsDrawer} = useSelector(state => state.drawersStatus);
  const [type, setType] = useState({});
  const [name, setName] = useState('');
  const [currentBalance, setCurrentBalance] = useState('0.00');
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleCloseAccountsDrawer = () => {
    dispatch(closeAccountsDrawer());
  };
  const handleTypePress = t => {
    setType(t);
  };

  const handleAmountFocus = e => {
    if (currentBalance === '0.00') {
      setCurrentBalance('');
    }
  };
  const handleAmountBlur = e => {
    if (currentBalance === '') {
      setCurrentBalance('0.00');
    }
  };

  const handleAddAccount = async () => {
    try {
      setLoading(true);
      const {success, result} = validateAccount(
        type?.value,
        name,
        currentBalance,
      );
      if (success) {
        const account = await AccountsQueries.addAccount(result);
        if (account) {
          setAdded(true);
          setLoading(false);
        } else {
          dispatchSnackBar({text: `Ooops that wasn't supposed to happen!!!`});
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      dispatchSnackBar({text: `Ooops that wasn't supposed to happen!!!`});
      console.log({err, location: 'AccountsDrawer/handleAddAccount'});
    }
  };

  useEffect(() => {
    let timeout;
    if (added) {
      timeout = setTimeout(() => {
        setAdded(false);
        handleCloseAccountsDrawer();
      }, 2000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [added]);

  useEffect(() => {
    setName('');
    setType({});
    setCurrentBalance('0.00');
  }, [accountsDrawer]);

  return (
    <Modal animationType="slide" visible={!!accountsDrawer} transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1, width: '100%'}}
        onPress={handleCloseAccountsDrawer}>
        <TouchableWithoutFeedback>
          <Form title={'Add Account'} heightPercentage={47}>
            {loading ? (
              <Loader />
            ) : added ? (
              <Success />
            ) : (
              <>
                <Chips
                  placeholder={'Account Type'}
                  selected={type}
                  onPress={handleTypePress}
                  items={AccountTypes}
                  valueField={'value'}
                />
                <MT MT={theme.spacings.verticalScale.s4} />
                <NormalInput
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                />
                <MT MT={theme.spacings.verticalScale.s4} />
                <NormalInput
                  placeholder="Current Balance"
                  onBlur={handleAmountBlur}
                  onFocus={handleAmountFocus}
                  value={currentBalance}
                  inputMode="numeric"
                  onChangeText={setCurrentBalance}
                />
                <MT MT={theme.spacings.verticalScale.s16} />
                <Button variant={'solid'} onPress={handleAddAccount}>
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

export default AccountsDrawer;

import React, {useState} from 'react';
import {Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {closeTransfersDrawer} from '../redux/drawersStatus';
import Form from './Form';
import useTheme from '../hooks/useTheme';
import {MT} from '../styled/MT';
import Chips from './Chips';
import NormalInput from './InputBoxes/NormalInput';
import DateTimePicker from './InputBoxes/DateTimePicker';
import {Button} from './Buttons/Button';

const TransfersDrawer = () => {
  const {transfersDrawer} = useSelector(state => state.drawersStatus);
  const dispatch = useDispatch();
  const [type, setType] = useState({});
  const theme = useTheme();
  const handleCloseTransfersDrawer = () => {
    dispatch(closeTransfersDrawer());
  };
  const handleTypePress = t => {
    setType(t);
  };

  return (
    <Modal animationType="slide" visible={!!transfersDrawer} transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1, width: '100%'}}
        onPress={handleCloseTransfersDrawer}>
        <TouchableWithoutFeedback>
          <Form title={'Add Transfer'} heightPercentage={50}>
            <Chips
              selected={type}
              onPress={handleTypePress}
              items={[
                {
                  label: 'Debit',
                  value: 'Debit',
                },
                {
                  label: 'Credit',
                  value: 'Credit',
                },
              ]}
            />

            <MT MT={theme.spacings.verticalScale.s4} />
            <Chips
              selected={type}
              onPress={handleTypePress}
              items={[
                {
                  label: 'HDFC',
                  value: 'HDFC',
                },
                {
                  label: 'PAYTM',
                  value: 'PAYTM',
                },
              ]}
            />
            <MT MT={theme.spacings.verticalScale.s4} />
            <NormalInput placeholder="Amount" />
            <MT MT={theme.spacings.verticalScale.s4} />
            <DateTimePicker
              mode="datetime"
              placeholder="Date"
              onChange={d => console.log({d})}
            />
            <MT MT={theme.spacings.verticalScale.s16} />
            <Button variant={'solid'}>SUBMIT</Button>
          </Form>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default TransfersDrawer;

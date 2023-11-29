import React, {useReducer, useRef, useState} from 'react';
import styled from 'styled-components/native';
import AddButton from 'components/Buttons/AddButton';
import AccountsDrawer from 'components/AccountsDrawer';
import TransactionsDrawer from 'components/TransactionsDrawer';
import TransfersDrawer from 'components/TransfersDrawer';
import ColorPicker from 'components/ColorPicker';

import Tabbar from '../../components/TabBar/TabBar';
import useTheme from 'hooks/useTheme';
import {normalize} from '../../utils/normalize';
import {useDispatch} from 'react-redux';
import {openTransactionsDrawer} from '../../redux/drawersStatus';

const Home = () => {
  return <Wrapper></Wrapper>;
};

export default Home;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.loginText};
  border: 5px solid black;
`;

//

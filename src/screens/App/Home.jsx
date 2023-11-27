import React from 'react';
import styled from 'styled-components/native';
import AddButton from '../../components/Buttons/AddButton';
import AccountsDrawer from '../../components/AccountsDrawer';
import TransactionsDrawer from '../../components/TransactionsDrawer';
import TransfersDrawer from '../../components/TransfersDrawer';

const Home = () => {
  return (
    <Wrapper>
      <AccountsDrawer />
      <TransactionsDrawer />
      <TransfersDrawer />
      <AddButton />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.loginText};
`;

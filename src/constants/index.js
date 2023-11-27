export const TRANSACTION_TYPES_ENUM = {
  DEBIT: 'DEBIT',
  CREDIT: 'CREDIT',
};

export const AccountTypes = [
  {label: 'SBA', value: 'SBA', icon: ''},
  {label: 'WALLET', value: 'WALLET', icon: ''},
  {label: 'CC', value: 'CC', icon: ''},
  {label: 'LOAN', value: 'LOAN', icon: ''},
];

export const TransactionsTypes = [
  {
    label: TRANSACTION_TYPES_ENUM.DEBIT,
    value: TRANSACTION_TYPES_ENUM.DEBIT,
    icon: '',
  },
  {
    label: TRANSACTION_TYPES_ENUM.CREDIT,
    value: TRANSACTION_TYPES_ENUM.CREDIT,
    icon: '',
  },
];

export const TransactionsSummaries = [
  {
    label: 'BillPay',
    value: 'BillPay',
    icon: '',
  },
  {
    label: 'Expense',
    value: 'Expense',
    icon: '',
  },
  {
    label: 'Salary',
    value: 'Salary',
    icon: '',
  },
];

/**
 * ログイン時
 */

import {useReducer} from 'react';

interface State {
  user?: {
    password: string;
  };
  errors?: {
    password: boolean;
  };
  disabled: boolean;
}

type Actions =
  | {type: 'CHANGE_VALUE'; data: {password: string}}
  | {type: 'ERROR'; data: {password: boolean}}
  | {type: 'WARNING'; data: {warning: boolean}};

const initialState: State = {disabled: true};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return {
        ...state,
        user: action.data,
        disabled: !action.data.password,
      };
    case 'ERROR':
      return {
        ...state,
        errors: action.data,
      };
    default:
      return state;
  }
};

export default function useLoginReducer() {
  const [login_state, login_dispatch] = useReducer(reducer, initialState);
  return {login_state, login_dispatch};
}

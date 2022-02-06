/**
 * アプリ全体に関わる情報
 */

import React, {createContext, useReducer, useMemo, Dispatch} from 'react';
import storage from '../storages/Storage';

type ToastType = 'info' | 'fail' | 'none';

interface State {
  hasUserAuth: boolean;
  token?: {
    resetAppToken: string;
    reset_password_token: string;
  };
  twilio?: {
    roomName: string;
    participantId: string;
    callUserName: string;
    token: string;
  };
  auth?: {
    uid: string;
    client: string;
  };
  user?: {
    uid: string;
    provider: string;
    first_name: string;
    last_name: string;
  };
  login?: {
    password: string;
  };
  toast?: {
    code: ToastType;
    message: string;
  };
}

type Actions =
  | {
      type: 'SUCCESS_AUTHENTICATION';
      payload: {
        auth: {uid: string; client: string};
        user: {
          uid: string;
          provider: string;
          first_name: string;
          last_name: string;
        };
      };
    }
  | {
      type: 'CHANGE_VALUE';
      payload: {resetAppToken: string; reset_password_token: string};
    }
  | {type: 'DELETE_AUTHENTICATION'}
  | {type: 'FAIL_AUTHENTICATION'; payload: {code: ToastType; message: string}}
  | {type: 'DISSMISS_TOAST'}
  | {type: 'DISPLAY_TOAST'; payload: {code: ToastType; message: string}}
  | {type: 'RESET_CHANGE'; payload: {resetCall: boolean}};

const initialState: State = {
  hasUserAuth: false,
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'SUCCESS_AUTHENTICATION':
      return {
        hasUserAuth: true,
        ...action.payload,
      };

    case 'CHANGE_VALUE':
      return {
        ...state,
        ...action.payload,
      };
    case 'DELETE_AUTHENTICATION':
      storage.remove({
        key: 'appData',
      });
      return {
        hasUserAuth: false,
        toast: {
          code: 'info',
          message: 'ログアウトしました。',
        },
      };
    case 'FAIL_AUTHENTICATION':
      return {
        hasUserAuth: false,
        toast: action.payload,
      };
    case 'DISPLAY_TOAST':
      return {
        ...state,
        toast: action.payload,
      };
    case 'DISSMISS_TOAST':
      return {
        ...state,
        toast: undefined,
      };

    default:
      return state;
  }
};

// eslint-disable-next-line no-undef
export default State;

export const AppStore = createContext<{
  state: State;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppStoreProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state, dispatch]);

  return <AppStore.Provider value={contextValue}>{children}</AppStore.Provider>;
};

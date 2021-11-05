import {ActionUser as ActionStream} from '../action/types';
import {
  InitialStateUserType as InitialStateStreamType,
  StreamTypes,
} from './types';

export const initialStateStream: InitialStateStreamType = {
  name: '',
  uid: null,
  keyDatabases: '',
};

export const stream = (state = initialStateStream, action: ActionStream) => {
  switch (action.type) {
    case StreamTypes.USER_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case StreamTypes.INFO_STREAM:
      return {
        ...state,
        uid: action.payload.uid,
        keyDatabases: action.payload.keyDatabases,
      };
    default:
      return state;
  }
};

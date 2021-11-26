import {LiveType} from '../../../Navigation/Tab/types';
import {isBroadcasterFunction} from '../helpers/isBroadcaster';

describe('Check broadcaster', () => {
  test('check result true', () => {
    expect(isBroadcasterFunction(LiveType.CREATE)).toBeTruthy();
  });

  test('check result false', () => {
    expect(isBroadcasterFunction(LiveType.JOIN)).toBeFalsy();
  });
});

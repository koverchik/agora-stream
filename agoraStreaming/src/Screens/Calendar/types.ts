import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';

import {EventInDatabases} from '../../Components/ModalCreateEvent/types';
import {TabNavigation, TabParamList} from '../../Navigation/Tab/types';

export type StreamType = {
  id: string;
  time: number;
  type: CallTypes;
  name: string;
};

export enum CallTypes {
  Audio = 'Audio',
  Video = 'Video',
  Chat = 'Chat',
}

export type CalendarScreenProps = {
  navigation: TabNavigationPropsProfileType;
  route: RouteProp<TabParamList, TabNavigation.Calendar>;
};

export type TabNavigationPropsProfileType = BottomTabNavigationProp<
  TabParamList,
  TabNavigation.Calendar
>;

export type FunctionSortByTimeType = (arr: StreamType[]) => StreamType[];

export type ArrayListDataType = (data: EventInDatabases[]) => StreamType[];

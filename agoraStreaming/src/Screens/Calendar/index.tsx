import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {getHeaderTitle} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';

import database from '@react-native-firebase/database';

import notifee from '@notifee/react-native';

import {CustomHeader} from '../../Components/Header';
import {HorizontalCalendar} from '../../Components/HorizontalCalendar';
import {DateInfoType} from '../../Components/HorizontalCalendar/types';
import {ModalCreatEvent} from '../../Components/ModalCreateEvent';
import {EventInDatabases} from '../../Components/ModalCreateEvent/types';
import {StreamEventItem} from '../../Components/StreamEventItem';
import {
  HeaderInputPlaceholders,
  TabNavigation,
} from '../../Navigation/Tab/types';
import {arrayListData} from './helpers/arrayListData';
import {
  TIME_NOTIFICATION,
  onCreateTriggerNotification,
} from './helpers/onCreateTriggerNotification';
import {styles} from './styles';
import {
  CalendarScreenProps,
  StreamType,
  TabNavigationPropsProfileType,
} from './types';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const ScreenCalendar: FC<CalendarScreenProps> = () => {
  const navigation = useNavigation<TabNavigationPropsProfileType>();

  const dataSystem = new Date();

  const [streams, setStreams] = useState<StreamType[]>([]);
  const [searchResult, setSearchResult] = useState<StreamType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [chosenDay, setChoseDay] = useState(
    `${dataSystem.getFullYear()}-${
      dataSystem.getMonth() + 1
    }-${dataSystem.getDate()}`,
  );

  const changeModalVisible = () => setModalVisible(!isModalVisible);

  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  const selectDay = (date: DateInfoType) => {
    setSearchResult([]);
    setSearchValue('');
    setChoseDay(`${date.year}-${date.month}-${date.day}`);
  };

  const onChangeSearchValue = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const result = streams.filter((stream) => {
      setSearchValue(event.nativeEvent.text);
      const matchFound = stream.name.includes(event.nativeEvent.text);
      const voidString = event.nativeEvent.text === '';

      if (matchFound && !voidString) {
        return stream;
      }
    });
    setSearchResult(result);
  };

  const showData = () => {
    if (searchResult.length > 0 || (!searchResult.length && searchValue)) {
      return searchResult;
    }

    if (!searchResult.length && !searchValue) {
      return streams;
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({route, options}) => {
        const title = getHeaderTitle(options, route.name);

        return (
          <CustomHeader
            title={title}
            placeholderText={HeaderInputPlaceholders.CALENDAR}
            screen={TabNavigation.Calendar}
            filter={onChangeSearchValue}
          />
        );
      },
    });
  }, [navigation, streams]);

  useEffect(() => {
    database()
      .ref(`/events/${chosenDay}`)
      .on('value', (snapshot) => {
        const data: EventInDatabases[] = snapshot.val();
        data !== null ? setStreams(arrayListData(data)) : setStreams([]);
      });
  }, [chosenDay]);

  useEffect(() => {
    database()
      .ref(`/events/${chosenDay}`)
      .on('value', (snapshot) => {
        const data: EventInDatabases[] = snapshot.val();
        notifee.getTriggerNotificationIds().then((ids) => {
          if (data !== null) {
            for (const key in data) {
              const dateTimeNotification =
                Date.parse(data[key].dateTime) - TIME_NOTIFICATION;
              if (
                Date.now() < dateTimeNotification &&
                ids.indexOf(key) === -1
              ) {
                onCreateTriggerNotification(
                  data[key].dateTime,
                  data[key].name,
                  key,
                );
              }
            }
          }
        });
      });
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <TouchableOpacity
            onPress={changeModalVisible}
            style={styles.addNewEvent}>
            <FontAwesomeIcon icon={faPlus} color={'white'} size={18} />
          </TouchableOpacity>
          <HorizontalCalendar
            onDayPress={selectDay}
            activeDayColor={'#007eff'}
          />
        </View>
        <ModalCreatEvent
          day={chosenDay}
          changeModalVisible={changeModalVisible}
          isModalVisible={isModalVisible}
        />
        <Animated.ScrollView
          style={styles.flatList}
          scrollEventThrottle={46}
          onScroll={scrollHandler}
          contentContainerStyle={styles.contentContainerStyle}>
          {streams.length ? (
            showData()?.map((item, index) => {
              return (
                <StreamEventItem
                  stream={item}
                  key={item.id}
                  translationY={translationY}
                  index={index}
                />
              );
            })
          ) : (
            <View style={styles.titleForEmptyListContainer}>
              <Text>No scheduled streams</Text>
            </View>
          )}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import {setCoordinatesAction} from '../../Redux/actions/HomeActions';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {selectUser} from '../../Redux/selectors/AuthSelectors';
import {selectChannelsList} from '../../Redux/selectors/HomeSelectors';
import {ListChannelsType} from '../../Screens/Home/types';
import {HeaderStyles, MARGIN, SIZE_BLOCKS_ITEM} from './styles';
import {CustomHeaderPropsType} from './types';
import {
  faBell,
  faCheckCircle,
  faSearch,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const CustomHeader: FC<CustomHeaderPropsType> = (props) => {
  const {title} = props;

  const {width} = useWindowDimensions();
  const styles = HeaderStyles(width);

  const user = useAppSelector(selectUser);
  const channelsList = useAppSelector(selectChannelsList);
  const dispatch = useAppDispatch();

  const inputAnimatedRef = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const [searchResult, setSearchResult] = useState<ListChannelsType[]>([]);

  const onPressSearch = () => {
    setSearchMode(true);
    Animated.timing(inputAnimatedRef, {
      toValue: width - SIZE_BLOCKS_ITEM * 2 + MARGIN,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const stream = channelsList.filter((channel) => {
      if (channel.name.includes(searchValue) && searchValue !== '') {
        return channel.name;
      }
    });
    setSearchResult(stream);
  }, [searchValue]);

  const onPressCheck = () => {
    Animated.timing(inputAnimatedRef, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setSearchMode(false);
    }, 1720);
  };

  const onPressResult = (stream: ListChannelsType) => {
    dispatch(setCoordinatesAction(stream.coords));
    onPressCheck();
    setSearchValue('');
  };

  return (
    <View>
      <View style={styles.container}>
        <Animated.View style={[styles.wrapperSectionIcons, {opacity}]}>
          <View style={styles.wrapperIcon}>
            {user?.photo ? (
              <Image source={{uri: user?.photo}} style={styles.image} />
            ) : (
              <FontAwesomeIcon icon={faUser} color={'white'} size={17} />
            )}
          </View>
          <View style={styles.wrapperIcon}>
            <FontAwesomeIcon icon={faUserPlus} color={'white'} size={20} />
          </View>
        </Animated.View>
        <Animated.View style={[styles.titleContainer, {opacity}]}>
          <Text style={styles.title}>{title}</Text>
        </Animated.View>
        <View style={styles.wrapperSectionIcons}>
          <Animated.View style={[styles.wrapperIcon, {opacity}]}>
            <FontAwesomeIcon icon={faBell} color={'white'} size={18} />
          </Animated.View>
          {searchMode ? (
            <TouchableOpacity style={styles.wrapperIcon} onPress={onPressCheck}>
              <FontAwesomeIcon
                icon={faCheckCircle}
                color={'#7adaa8'}
                size={37}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.wrapperIcon}
              onPress={onPressSearch}>
              <FontAwesomeIcon icon={faSearch} color={'white'} size={18} />
            </TouchableOpacity>
          )}
        </View>
        {searchMode && (
          <Animated.View
            style={[styles.inputContainer, {width: inputAnimatedRef}]}>
            <TextInput
              style={styles.input}
              onChangeText={setSearchValue}
              value={searchValue}
            />
          </Animated.View>
        )}
      </View>
      {!!searchValue && (
        <FlatList
          style={{
            backgroundColor: 'rgba(52, 52, 52, 1)',
            marginHorizontal: 10,
            borderRadius: 35 / 2,
            padding: 10,
            width: width - SIZE_BLOCKS_ITEM * 2 + MARGIN,
          }}
          data={searchResult}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                height: 40,
                backgroundColor: '#282727',
                marginBottom: 5,
                justifyContent: 'center',
                paddingHorizontal: 15,
                borderRadius: 15,
              }}
              onPress={() => onPressResult(item)}>
              <Text style={{color: '#fff'}}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={{color: '#fff', textAlign: 'center'}}>
              Streams is not found!
            </Text>
          }
        />
      )}
    </View>
  );
};

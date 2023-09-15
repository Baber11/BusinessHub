import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import {FlatList, Icon, ScrollView} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../Components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import {
  AddToCart,
  decrementQuantity,
  increamentQuantity,
  setColor,
  setCotton,
  setServiceBooking,
  setSize,
} from '../Store/slices/common';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Color from '../Assets/Utilities/Color';
import CommentsSection from '../Components/CommentsSection';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import navigationService from '../navigationService';
import {Post} from '../Axios/AxiosInterceptorFunction';

const ServiceDetails = props => {
  console.log(
    '🚀 ~ file: ServiceDetails.js:43 ~ ServiceDetails ~ props:',
    props?.route?.params,
  );
  const item = props?.route?.params?.item;
  console.log('🚀 ~ file: ServiceDetails.js:43 ~ ServiceDetails ~ item:', item);
  // console.log("🚀 ~ file: ServiceDetails.js:43 ~ ServiceDetails ~ item:", item?.order?.images[0])
  const seller = props?.route?.params?.seller;
  const token = useSelector(state => state.authReducer.token);
  console.log(
    '🚀 ~ file: ServiceDetails.js:32 ~ ServiceDetails ~ seller:',
    seller,
  );
  const navigation = useNavigation();
  const user = useSelector(state => state.commonReducer.userData);
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const [index, setIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState(
    item?.comments ? item?.comments : [],
  );
  const [images, setImages] = useState(
    item?.service_image ? item?.service_image : item?.images,
  );
  console.log(
    '🚀 ~ file: ServiceDetails.js:66 ~ ServiceDetails ~ images:',
    images,
  );
  const [yourComment, setYourComment] = useState('');
  const [bookingModal, setBookingModal] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [date, setDate] = useState('');

  const Confirm = () => {
    Alert.alert('Action required', 'Login to Continue', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          navigationService.navigate('LoginScreen');
        },
      },
    ]);
    return true;
  };

  const addComment = () => {
    if (token != null) {
      const body = {
        userName: user?.name,
        image: user?.image,
        text: yourComment,
        time: moment().format(' hh:mm:ss a'),
      };
      console.log('Body is here==========>>>>>>>>>>>>>>>>>', body);
      setComments(prev => [
        ...prev,
        {
          userName: user?.name,
          image: user?.image,
          text: yourComment,
          time: moment().format(' hh:mm:ss a'),
        },
      ]);
      setYourComment('');
    } else {
      Confirm();
    }
  };

  const BookNow = async () => {
    const url = 'auth/services/book';
    const body = {service_id: item?.id, date: date, charges: item?.charges};
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response?.data?.success) {
      return console.log(
        '🚀 ~ file: ServiceDetails.js:112 ~ BookingNow ~ response:',
        response?.data,
      );
    }
  };

  return (
    <>
      <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
      <Header
        showBack={true}
        headerColor={['#CBE4E8', '#D2E4E4']}
        cart={!seller}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
        }}>
        <View style={styles.banner}>
          <View style={styles.container}>
            {index > 0 && images?.length > 1 && (
              <>
                <View
                  style={{
                    width: windowWidth * 0.6,
                    height: windowHeight * 0.32,
                    alignItems: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                    left: -170,
                    position: 'absolute',
                    backgroundColor: 'black',
                  }}>
                  <CustomImage
                    source={{
                      uri: images[index - 1]?.photo,
                    }}
                    style={{
                      height: '100%',
                      height: '100%',
                    }}
                    resizeMode={'cover'}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setIndex(index - 1);
                  }}
                  style={{
                    height: moderateScale(25, 0.6),
                    width: moderateScale(25, 0.6),
                    borderRadius: moderateScale(25, 0.6) / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: -5,
                    backgroundColor: Color.themeColor,
                  }}>
                  <Icon name={'left'} as={AntDesign} color={'white'} />
                </TouchableOpacity>
              </>
            )}

            <View
              style={{
                width: windowWidth * 0.6,
                height: windowHeight * 0.34,
                overflow: 'hidden',
                alignSelf: 'center',
                backgroundColor: 'black',
              }}>
              <CustomImage
                source={{
                  uri:
                    images?.length == 1
                      ? images[index - 1]?.photo
                      : images[index]?.photo,
                }}
                style={{
                  height: '100%',
                  height: '100%',
                }}
              />
            </View>
            {index < images?.length - 1 && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setIndex(index + 1);
                  }}
                  style={{
                    height: moderateScale(25, 0.6),
                    width: moderateScale(25, 0.6),
                    borderRadius: moderateScale(25, 0.6) / 2,
                    alignItems: 'center',
                    zIndex: 1,
                    justifyContent: 'center',
                    right: -5,
                    backgroundColor: Color.themeColor,
                  }}>
                  <Icon name={'right'} as={AntDesign} color={'white'} />
                </TouchableOpacity>

                <View
                  style={{
                    width: windowWidth * 0.6,
                    height: windowHeight * 0.32,
                    alignItems: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                    right: -170,
                    position: 'absolute',
                    backgroundColor: 'black',
                  }}>
                  <CustomImage
                    source={{
                      uri: images[index + 1]?.photo,
                    }}
                    style={{
                      height: '100%',
                      height: '100%',
                    }}
                  />
                </View>
              </>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: moderateScale(10, 0.6),
              alignItems: 'center',
              // backgroundColor:'purple',
            }}>
            <CustomText
              isBold
              numberOfLines={1}
              style={{
                color: '#252E2B',
                fontSize: moderateScale(18, 0.6),
                width: windowWidth * 0.4,
                textAlign: 'left',
                // backgroundColor:'orange',
              }}>
              {item?.shop_name ? item?.shop_name : item?.service?.shop_name}
            </CustomText>

            <CustomText
              style={{
                color: '#818181',
                width: windowWidth * 0.38,
                fontSize: moderateScale(14, 0.6),
                textAlign: 'left',
                // backgroundColor:'red',
              }}
              numberOfLines={1}>
              {item?.category ? item?.category : item?.service?.category}
            </CustomText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: moderateScale(5, 0.6),
              alignItems: 'center',
            }}>
            <CustomText
              isBold
              style={{
                color: Color.themeColor,
                fontSize: 24,
                width: windowWidth * 0.31,
              }}>
              {item?.charges}.00 PKR
            </CustomText>
          </View>
        </View>
        <View
          style={{
            width: windowWidth * 0.95,
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: moderateScale(10, 0.3),
            borderRadius: moderateScale(10, 0.6),
            paddingVertical: moderateScale(10, 0.6),
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(14, 0.6),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            Description
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            {item?.description ? item?.description : item?.service?.description}
          </CustomText>
        </View>

        {!seller && <View style={styles.container2}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(14, 0.6),
                  marginTop: moderateScale(10, 0.3),
                  color: '#201E1D',
                  width: windowWidth * 0.9,
                  marginLeft: moderateScale(10, 0.3),
                }}>
                Book a date
              </CustomText>
              <Calendar
                style={{
                  width: windowWidth * 0.8,
                  marginBottom: moderateScale(40, 0.3),
                  // backgroundColor : 'red'
                }}
                minDate={moment().format()}
                onDayPress={day => {
                  console.log('day========>>>>>', day);
                  setDate(day?.dateString);
                }}
                theme={{
                  textSectionTitleColor: Color.themeColor,
                  selectedDayBackgroundColor: Color.themeColor,
                  selectedDayTextColor: Color.white,
                  todayTextColor: Color.themeColor,
                  dayTextColor: Color.black,
                  dayTextColor: Color.black,
                  textDisabledColor: '#d9e1e8',
                  arrowColor: Color.themeColor,
                  monthTextColor: Color.veryLightGray,
                  indicatorColor: Color.themeColor,
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: 'bold',
                  textDayFontSize: moderateScale(12, 0.3),
                  textMonthFontSize: moderateScale(16, 0.3),
                  textDayHeaderFontSize: moderateScale(14, 0.3),
                }}
                markedDates={{
                  ...{
                    [date]: {
                      selected: true,
                      color: Color.themeColor,
                      textColor: '#000000',
                      marked: true,
                    },
                  },
                }}
              />
            

        </View>}

        {seller && item?.date &&
        <View style={styles.container2}> 
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(14, 0.6),
            marginTop: moderateScale(10, 0.3),
            color: '#201E1D',
            width: windowWidth * 0.9,
            marginLeft: moderateScale(10, 0.3),
          }}>
          Booking Date
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(14, 0.6),
            // marginTop: moderateScale(10, 0.3),
            color: '#201E1D',
            width: windowWidth * 0.9,
            marginLeft: moderateScale(10, 0.3),
          }}>
          {item?.date}
        </CustomText>
      </View>
        }

  

        {
          <View
            style={{
              width: windowWidth * 0.95,
              backgroundColor: 'white',
              alignSelf: 'center',
              marginTop: moderateScale(10, 0.3),
              borderRadius: moderateScale(10, 0.6),
              paddingVertical: moderateScale(10, 0.6),
              alignItems: 'center',
            }}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(14, 0.6),
                color: '#201E1D',
                width: windowWidth * 0.9,
                marginLeft: moderateScale(10, 0.3),
              }}>
              Reviews
            </CustomText>

            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={comments}
              contentContainerStyle={{
                alignSelf: 'center',
                marginTop: moderateScale(5, 0.3),
              }}
              renderItem={({item, index}) => {
                return <CommentsSection item={item} />;
              }}
              ListEmptyComponent={
                <CustomText
                  style={{
                    fontSize: moderateScale(15, 0.6),
                    color: Color.veryLightGray,
                  }}>
                  No Reviews Yet
                </CustomText>
              }
            />
            {!seller && (
              <>
                <CustomText
                  isBold
                  style={{
                    fontSize: moderateScale(14, 0.6),
                    marginTop: moderateScale(10, 0.3),
                    color: '#201E1D',
                    width: windowWidth * 0.9,
                    marginLeft: moderateScale(10, 0.3),
                  }}>
                  Your review
                </CustomText>
                <View
                  style={{
                    flexDirection: 'row',
                    // backgroundColor:'black',
                    width: windowWidth * 0.9,
                    justifyContent: 'space-between',
                  }}>
                  <TextInputWithTitle
                    titleText={'Write a review'}
                    // secureText={false}
                    placeholder={'Write a review'}
                    setText={setYourComment}
                    value={yourComment}
                    viewHeight={0.05}
                    viewWidth={0.7}
                    inputWidth={0.7}
                    // border={1}
                    borderColor={Color.veryLightGray}
                    backgroundColor={'#FFFFFF'}
                    marginTop={moderateScale(10, 0.3)}
                    color={Color.themeColor}
                    marginRight={moderateScale(10, 0.3)}
                    placeholderColor={Color.themeLightGray}
                    borderRadius={moderateScale(25, 0.3)}
                    marginBottom={moderateScale(10, 0.3)}
                    elevation
                  />
                  <CustomButton
                    isBold
                    onPress={() => {
                      addComment();
                    }}
                    text={'Add'}
                    textColor={Color.white}
                    width={windowWidth * 0.15}
                    height={windowHeight * 0.045}
                    fontSize={moderateScale(10, 0.6)}
                    // marginBottom={moderateScale(10,.3)}
                    // marginTop={moderateScale(20, 0.3)}
                    bgColor={Color.themeColor}
                    borderRadius={moderateScale(30, 0.3)}
                    // isGradient
                  />
                </View>
              </>
            )}
          </View>
        }
      </ScrollView>

      {!seller && (
        <View style={styles.bottomContainer}>
          <CustomButton
            isBold
            onPress={() => {
              if (token == null) {
                Confirm();
                // if () {
                //   setCalendar(true);
                // }
              } else {
                if (date == '') {
                  return Platform.OS == 'android'
                    ? ToastAndroid.show(
                        'Please select a date',
                        ToastAndroid.SHORT,
                      )
                    : Alert.alert('Please select a date');
                } else {
                  console.log('item dispatching......', {
                    order: item,
                    date: date,
                    orderId: Math.floor(Math.random() * 1000000000),
                  });
                  // dispatch(
                  //   setServiceBooking({
                  //     order: [item],
                  //     date: date,
                  //     total: item?.price,
                  //     Image: require('../Assets/Images/logo.png'),
                  //     orderId: Math.floor(Math.random() * 1000000000),
                  //   }),
                  // );
                  BookNow();
                  Platform.OS == 'android'
                    ? ToastAndroid.show(
                        'Your Booking has been confirmed',
                        ToastAndroid.SHORT,
                      )
                    : Alert.alert('Your Booking has been confirmed');
                  navigation.goBack();
                }
              }
            }}
            text={'Book Now'}
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.07}
            fontSize={moderateScale(16, 0.6)}
            // marginBottom={moderateScale(10,.3)}
            // marginTop={moderateScale(20, 0.3)}
            bgColor={Color.themeColor}
            borderRadius={moderateScale(30, 0.3)}
            //   isGradient
          />
        </View>
      )}
    </>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container2:{
    width: windowWidth * 0.95,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: moderateScale(10, 0.3),
    borderRadius: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    alignItems: 'center',
  },
  size: {
    height: windowWidth * 0.08,
    alignItems: 'center',
    // backgroundColor:'red',
    width: windowWidth * 0.08,
    borderRadius: (windowWidth * 0.1) / 2,
    justifyContent: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    width: windowWidth,
    height: windowHeight * 0.08,
    backgroundColor: '#FFFFFF',
    //  alignItems:'center',
    bottom: 0,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    height: windowHeight * 0.35,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  colorContainer: {
    height: windowWidth * 0.08,
    width: windowWidth * 0.08,
    borderRadius: (windowWidth * 0.1) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(15, 0.3),
  },
  icon: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    borderRadius: (windowWidth * 0.06) / 2,
    backgroundColor: Color.themeColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: windowWidth * 0.95,
    // height: windowHeight * 0.8,
    backgroundColor: 'white',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: moderateScale(10, 0.3),
    shadowColor: '#0000000A',
    shadowOffset: {width: 0, height: 2},
  },

  conterContainer: {
    width: windowWidth * 0.27,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: moderateScale(5, 0.6),
    // backgroundColor:'black'
  },

  ColorLine: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    // flexWrap:'no-wrap',
    // width: windowWidth * 0.8,
    marginTop: moderateScale(15, 0.3),
    marginBottom: moderateScale(15, 0.3),
  },

  ColorLine1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: windowWidth * 0.7,
    marginTop: moderateScale(15, 0.3),
    marginBottom: moderateScale(15, 0.3),
  },

  bottomBanner: {
    width: windowWidth,
    height: windowHeight * 0.13,
    position: 'absolute',
    bottom: moderateScale(0, 0.3),
    backgroundColor: '#fff',
    elevation: 1,
  },
});
